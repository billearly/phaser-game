import { Scene, Input, GameObjects } from 'phaser';

export type Controls = {
  upKey: Input.Keyboard.Key;
  downKey: Input.Keyboard.Key;
  leftKey: Input.Keyboard.Key;
  rightKey: Input.Keyboard.Key;
}

export enum MovementControls {
  UP = Input.Keyboard.KeyCodes.W,
  DOWN = Input.Keyboard.KeyCodes.S,
  LEFT = Input.Keyboard.KeyCodes.A,
  RIGHT = Input.Keyboard.KeyCodes.D
}

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
    rightKey: scene.input.keyboard.addKey(MovementControls.RIGHT),
  }
}

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

// @TODO: Return an updated position instead of applying changes to the sprite directly
export const updatePlayerPosition = (controls: Controls, sprite: GameObjects.Sprite, speed: number): void => {
  const currentKey = getCurrentMovementKey(controls);

  switch (currentKey) {
    case MovementControls.UP:
      sprite.y -= speed;
      break;

    case MovementControls.DOWN:
      sprite.y += speed;
      break;

    case MovementControls.LEFT:
      sprite.x -= speed;
      break;

    case MovementControls.RIGHT:
      sprite.x += speed;
      break;

    default:
    //do nothing
  }
}

const getCurrentMovementKey = (controls: Controls): number | undefined => {
  if (controls.upKey.isDown && controls.downKey.isUp && controls.leftKey.isUp && controls.rightKey.isUp) {
    return MovementControls.UP;
  } else if (controls.upKey.isUp && controls.downKey.isDown && controls.leftKey.isUp && controls.rightKey.isUp) {
    return MovementControls.DOWN;
  } else if (controls.upKey.isUp && controls.downKey.isUp && controls.leftKey.isDown && controls.rightKey.isUp) {
    return MovementControls.LEFT;
  } else if (controls.upKey.isUp && controls.downKey.isUp && controls.leftKey.isUp && controls.rightKey.isDown) {
    return MovementControls.RIGHT;
  } else {
    return;
  }
}
