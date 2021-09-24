import { Scene, GameObjects, Input, Physics } from 'phaser';
import { mocked } from 'ts-jest/utils';
import {
  Controls,
  getUpdatedSpritePosition,
  initializeControls,
  MovementControls,
  updateSpritePositionWithVelocity
} from '../controls';

describe('controls', () => {
  describe('initializeControls', () => {
    test('should register keys in the scene and return a controls object ', () => {
      const scene = mocked<Scene>({
        input: {
          keyboard: {
            addKey: jest.fn(),
            addCapture: jest.fn()
          }
        }
      } as unknown as Scene);

      const { addKey } = scene.input.keyboard;
      const controls = initializeControls(scene);

      expect(controls).not.toBeNull();
      expect(addKey).toBeCalledTimes(4);
      expect(addKey).toHaveBeenCalledWith(MovementControls.UP);
      expect(addKey).toHaveBeenCalledWith(MovementControls.DOWN);
      expect(addKey).toHaveBeenCalledWith(MovementControls.LEFT);
      expect(addKey).toHaveBeenCalledWith(MovementControls.RIGHT);
    });

    test('should capture input to prevent interference from browser', () => {
      const scene = mocked<Scene>({
        input: {
          keyboard: {
            addKey: jest.fn(),
            addCapture: jest.fn()
          }
        }
      } as unknown as Scene);

      const { addCapture } = scene.input.keyboard;
      initializeControls(scene);

      expect(addCapture).toBeCalledTimes(1);
      expect(addCapture).toBeCalledWith([
        MovementControls.UP,
        MovementControls.DOWN,
        MovementControls.LEFT,
        MovementControls.RIGHT
      ]);
    });
  });

  describe('getUpdateSpritePosition', () => {
    test('should return a position with a lower Y value when the upKey is pressed', () => {
      const controls: Controls = {
        ...mockedNeutralControls,
        upKey: mocked<Input.Keyboard.Key>({
          isUp: false,
          isDown: true
        } as unknown as Input.Keyboard.Key)
      };

      const sprite = mocked<GameObjects.Sprite>({
        x: 0,
        y: 0
      } as unknown as GameObjects.Sprite);

      const updatedPosition = getUpdatedSpritePosition(controls, sprite, 10);

      expect(updatedPosition.y).toBe(-10);
      expect(updatedPosition.x).toBe(0);
    });

    test('should return a position with a higher Y value when the downKey is pressed', () => {
      const controls: Controls = {
        ...mockedNeutralControls,
        downKey: mocked<Input.Keyboard.Key>({
          isUp: false,
          isDown: true
        } as unknown as Input.Keyboard.Key)
      };

      const sprite = mocked<GameObjects.Sprite>({
        x: 0,
        y: 0
      } as unknown as GameObjects.Sprite);

      const updatedPosition = getUpdatedSpritePosition(controls, sprite, 10);

      expect(updatedPosition.y).toBe(10);
      expect(updatedPosition.x).toBe(0);
    });

    test('should return a position with a lower X value when the leftKey is pressed', () => {
      const controls: Controls = {
        ...mockedNeutralControls,
        leftKey: mocked<Input.Keyboard.Key>({
          isUp: false,
          isDown: true
        } as unknown as Input.Keyboard.Key)
      };

      const sprite = mocked<GameObjects.Sprite>({
        x: 0,
        y: 0
      } as unknown as GameObjects.Sprite);

      const updatedPosition = getUpdatedSpritePosition(controls, sprite, 10);

      expect(updatedPosition.y).toBe(0);
      expect(updatedPosition.x).toBe(-10);
    });

    test('should return a position with a higher X value when the rightKey is pressed', () => {
      const controls: Controls = {
        ...mockedNeutralControls,
        rightKey: mocked<Input.Keyboard.Key>({
          isUp: false,
          isDown: true
        } as unknown as Input.Keyboard.Key)
      };

      const sprite = mocked<GameObjects.Sprite>({
        x: 0,
        y: 0
      } as unknown as GameObjects.Sprite);

      const updatedPosition = getUpdatedSpritePosition(controls, sprite, 10);

      expect(updatedPosition.y).toBe(0);
      expect(updatedPosition.x).toBe(10);
    });
  });

  describe('updateSpritePositionWithVelocity', () => {
    test('should call setVelocityY with a negative speed when the upKey is pressed', () => {
      const controls: Controls = {
        ...mockedNeutralControls,
        upKey: mocked<Input.Keyboard.Key>({
          isUp: false,
          isDown: true
        } as unknown as Input.Keyboard.Key)
      };

      const sprite = createMockedPhysicsSprite();

      updateSpritePositionWithVelocity(controls, sprite, 400);

      expect(sprite.setVelocity).toBeCalledTimes(1);
      expect(sprite.setVelocity).toBeCalledWith(0);

      expect(sprite.setVelocityY).toBeCalledTimes(1);
      expect(sprite.setVelocityY).toBeCalledWith(-400);

      expect(sprite.setVelocityX).not.toBeCalled();
    });

    test('should call setVelocityY with a positive speed when the downKey is pressed', () => {
      const controls: Controls = {
        ...mockedNeutralControls,
        downKey: mocked<Input.Keyboard.Key>({
          isUp: false,
          isDown: true
        } as unknown as Input.Keyboard.Key)
      };

      const sprite = createMockedPhysicsSprite();

      updateSpritePositionWithVelocity(controls, sprite, 400);

      expect(sprite.setVelocity).toBeCalledTimes(1);
      expect(sprite.setVelocity).toBeCalledWith(0);

      expect(sprite.setVelocityY).toBeCalledTimes(1);
      expect(sprite.setVelocityY).toBeCalledWith(400);

      expect(sprite.setVelocityX).not.toBeCalled();
    });

    test('should call setVelocityX with a negative speed when the leftKey is pressed', () => {
      const controls: Controls = {
        ...mockedNeutralControls,
        leftKey: mocked<Input.Keyboard.Key>({
          isUp: false,
          isDown: true
        } as unknown as Input.Keyboard.Key)
      };

      const sprite = createMockedPhysicsSprite();

      updateSpritePositionWithVelocity(controls, sprite, 400);

      expect(sprite.setVelocity).toBeCalledTimes(1);
      expect(sprite.setVelocity).toBeCalledWith(0);

      expect(sprite.setVelocityX).toBeCalledTimes(1);
      expect(sprite.setVelocityX).toBeCalledWith(-400);

      expect(sprite.setVelocityY).not.toBeCalled();
    });

    test('should call setVelocityX with a positive speed when the rightKey is pressed', () => {
      const controls: Controls = {
        ...mockedNeutralControls,
        rightKey: mocked<Input.Keyboard.Key>({
          isUp: false,
          isDown: true
        } as unknown as Input.Keyboard.Key)
      };

      const sprite = mocked<Physics.Arcade.Sprite>({
        setVelocity: jest.fn(),
        setVelocityX: jest.fn(),
        setVelocityY: jest.fn()
      } as unknown as Physics.Arcade.Sprite);

      updateSpritePositionWithVelocity(controls, sprite, 400);

      expect(sprite.setVelocity).toBeCalledTimes(1);
      expect(sprite.setVelocity).toBeCalledWith(0);

      expect(sprite.setVelocityX).toBeCalledTimes(1);
      expect(sprite.setVelocityX).toBeCalledWith(400);

      expect(sprite.setVelocityY).not.toBeCalled();
    });
  });
});

const mockedNeutralControls: Controls = {
  upKey: mocked<Input.Keyboard.Key>({
    isUp: true,
    isDown: false
  } as unknown as Input.Keyboard.Key),
  downKey: mocked<Input.Keyboard.Key>({
    isUp: true,
    isDown: false
  } as unknown as Input.Keyboard.Key),
  leftKey: mocked<Input.Keyboard.Key>({
    isUp: true,
    isDown: false
  } as unknown as Input.Keyboard.Key),
  rightKey: mocked<Input.Keyboard.Key>({
    isUp: true,
    isDown: false
  } as unknown as Input.Keyboard.Key)
};

const createMockedPhysicsSprite = (): Physics.Arcade.Sprite => {
  return mocked<Physics.Arcade.Sprite>({
    setVelocity: jest.fn(),
    setVelocityX: jest.fn(),
    setVelocityY: jest.fn()
  } as unknown as Physics.Arcade.Sprite);
};
