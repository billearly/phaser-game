import { Scene, GameObjects, Input } from 'phaser';
import { mocked } from 'ts-jest/utils';
import { Controls, getUpdatedSpritePosition, initializeControls, MovementControls } from '../controls';

describe('controls', () => {
  describe("initializeControls", () => {
    test("should register keys in the scene and return a controls object ", () => {
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
      const controls = mocked<Controls>({
        upKey: mocked<Input.Keyboard.Key>({ isUp: false, isDown: true } as unknown as Input.Keyboard.Key),
        downKey: mocked<Input.Keyboard.Key>({ isUp: true, isDown: false } as unknown as Input.Keyboard.Key),
        leftKey: mocked<Input.Keyboard.Key>({ isUp: true, isDown: false } as unknown as Input.Keyboard.Key),
        rightKey: mocked<Input.Keyboard.Key>({ isUp: true, isDown: false } as unknown as Input.Keyboard.Key),
      });

      const sprite = mocked<GameObjects.Sprite>({
        x: 0,
        y: 0
      } as unknown as GameObjects.Sprite);

      const updatedPosition = getUpdatedSpritePosition(controls, sprite, 10);

      expect(updatedPosition.y).toBe(-10);
      expect(updatedPosition.x).toBe(0);
    });

    test('should return a position with a higher Y value when the downKey is pressed', () => {
      const controls = mocked<Controls>({
        upKey: mocked<Input.Keyboard.Key>({ isUp: true, isDown: false } as unknown as Input.Keyboard.Key),
        downKey: mocked<Input.Keyboard.Key>({ isUp: false, isDown: true } as unknown as Input.Keyboard.Key),
        leftKey: mocked<Input.Keyboard.Key>({ isUp: true, isDown: false } as unknown as Input.Keyboard.Key),
        rightKey: mocked<Input.Keyboard.Key>({ isUp: true, isDown: false } as unknown as Input.Keyboard.Key),
      });

      const sprite = mocked<GameObjects.Sprite>({
        x: 0,
        y: 0
      } as unknown as GameObjects.Sprite);

      const updatedPosition = getUpdatedSpritePosition(controls, sprite, 10);

      expect(updatedPosition.y).toBe(10);
      expect(updatedPosition.x).toBe(0);
    });

    test('should return a position with a lower X value when the leftKey is pressed', () => {
      const controls = mocked<Controls>({
        upKey: mocked<Input.Keyboard.Key>({ isUp: true, isDown: false } as unknown as Input.Keyboard.Key),
        downKey: mocked<Input.Keyboard.Key>({ isUp: true, isDown: false } as unknown as Input.Keyboard.Key),
        leftKey: mocked<Input.Keyboard.Key>({ isUp: false, isDown: true } as unknown as Input.Keyboard.Key),
        rightKey: mocked<Input.Keyboard.Key>({ isUp: true, isDown: false } as unknown as Input.Keyboard.Key),
      });

      const sprite = mocked<GameObjects.Sprite>({
        x: 0,
        y: 0
      } as unknown as GameObjects.Sprite);

      const updatedPosition = getUpdatedSpritePosition(controls, sprite, 10);

      expect(updatedPosition.y).toBe(0);
      expect(updatedPosition.x).toBe(-10);
    });

    test('should return a position with a higher X value when the rightKey is pressed', () => {
      const controls = mocked<Controls>({
        upKey: mocked<Input.Keyboard.Key>({ isUp: true, isDown: false } as unknown as Input.Keyboard.Key),
        downKey: mocked<Input.Keyboard.Key>({ isUp: true, isDown: false } as unknown as Input.Keyboard.Key),
        leftKey: mocked<Input.Keyboard.Key>({ isUp: true, isDown: false } as unknown as Input.Keyboard.Key),
        rightKey: mocked<Input.Keyboard.Key>({ isUp: false, isDown: true } as unknown as Input.Keyboard.Key),
      });

      const sprite = mocked<GameObjects.Sprite>({
        x: 0,
        y: 0
      } as unknown as GameObjects.Sprite);

      const updatedPosition = getUpdatedSpritePosition(controls, sprite, 10);

      expect(updatedPosition.y).toBe(0);
      expect(updatedPosition.x).toBe(10);
    });
  });
});