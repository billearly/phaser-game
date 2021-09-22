import { Scene } from 'phaser';
import { mocked } from 'ts-jest/utils';
import { initializeControls, MovementControls } from '../controls';

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