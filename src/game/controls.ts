import { Scene, Input, GameObjects, Physics } from 'phaser';

export type Controls = {
  upKey: Input.Keyboard.Key;
  downKey: Input.Keyboard.Key;
  leftKey: Input.Keyboard.Key;
  rightKey: Input.Keyboard.Key;
};

export enum MovementControls {
  UP = Input.Keyboard.KeyCodes.W,
  DOWN = Input.Keyboard.KeyCodes.S,
  LEFT = Input.Keyboard.KeyCodes.A,
  RIGHT = Input.Keyboard.KeyCodes.D
}

type Position = {
  x: number;
  y: number;
};

/**
 * Cache and capture game controls
 * @param scene The current scene
 */
export const initializeControls = (scene: Scene): Controls => {
  setCapturedKeys(scene);

  return {
    upKey: scene.input.keyboard.addKey(MovementControls.UP),
    downKey: scene.input.keyboard.addKey(MovementControls.DOWN),
    leftKey: scene.input.keyboard.addKey(MovementControls.LEFT),
    rightKey: scene.input.keyboard.addKey(MovementControls.RIGHT)
  };
};

/**
 * Calls preventDefault on game controls to so that default browser
 * behaviour doesn't affect gameplay
 * @param scene Reference to the scene
 */
const setCapturedKeys = (scene: Scene): void => {
  scene.input.keyboard.addCapture([
    MovementControls.UP,
    MovementControls.DOWN,
    MovementControls.LEFT,
    MovementControls.RIGHT
  ]);
};

/**
 * @deprecated Use `updatePositionWithVelocity` instead
 * which handles physics/collisions
 * @param controls Current keys mapped to movement controls
 * @param sprite The sprite to calculate the new position of
 * @param speed How much should be added/subtracted to the x or y coordinate
 * @returns `Position` object with new x and y coordinates
 */
export const getUpdatedSpritePosition = (
  controls: Controls,
  sprite: GameObjects.Sprite,
  speed: number
): Position => {
  const currentKey = getCurrentMovementKey(controls);

  const updatedPosition: Position = {
    x: sprite.x,
    y: sprite.y
  };

  switch (currentKey) {
    case MovementControls.UP:
      updatedPosition.y -= speed;
      break;

    case MovementControls.DOWN:
      updatedPosition.y += speed;
      break;

    case MovementControls.LEFT:
      updatedPosition.x -= speed;
      break;

    case MovementControls.RIGHT:
      updatedPosition.x += speed;
      break;

    default:
    //do nothing
  }

  return updatedPosition;
};

export const updateSpritePositionWithVelocity = (
  controls: Controls,
  sprite: Physics.Arcade.Sprite,
  speed: number
): void => {
  const currentKey = getCurrentMovementKey(controls);

  sprite.setVelocity(0);

  switch (currentKey) {
    case MovementControls.UP:
      sprite.setVelocityY(speed * -1);
      break;

    case MovementControls.DOWN:
      sprite.setVelocityY(speed);
      break;

    case MovementControls.LEFT:
      sprite.setVelocityX(speed * -1);
      break;

    case MovementControls.RIGHT:
      sprite.setVelocityX(speed);
      break;

    default:
    //do nothing
  }
};

const getCurrentMovementKey = (controls: Controls): number | undefined => {
  if (
    controls.upKey.isDown &&
    controls.downKey.isUp &&
    controls.leftKey.isUp &&
    controls.rightKey.isUp
  ) {
    return MovementControls.UP;
  } else if (
    controls.upKey.isUp &&
    controls.downKey.isDown &&
    controls.leftKey.isUp &&
    controls.rightKey.isUp
  ) {
    return MovementControls.DOWN;
  } else if (
    controls.upKey.isUp &&
    controls.downKey.isUp &&
    controls.leftKey.isDown &&
    controls.rightKey.isUp
  ) {
    return MovementControls.LEFT;
  } else if (
    controls.upKey.isUp &&
    controls.downKey.isUp &&
    controls.leftKey.isUp &&
    controls.rightKey.isDown
  ) {
    return MovementControls.RIGHT;
  } else {
    return;
  }
};
