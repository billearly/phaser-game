import { initializeCamera } from '../camera';
import { Scene } from 'phaser';
import { mocked } from 'ts-jest/utils';

describe('initializeCamera', () => {
  test('should set the background color', () => {
    const scene = mocked<Scene>({
      cameras: {
        main: {
          setBackgroundColor: jest.fn()
        }
      }
    } as unknown as Scene);

    const mockedScene = mocked<Scene>(scene, false);

    const camera = initializeCamera(mockedScene);

    expect(camera).not.toBeNull();
    expect(scene.cameras.main.setBackgroundColor).toBeCalledWith('#24252A');
  });
});