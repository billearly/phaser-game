import { Scene, Cameras } from 'phaser';

export const initializeCamera = (scene: Scene): Cameras.Scene2D.Camera => {
  const camera = scene.cameras.main;
  camera.setBackgroundColor('#24252A');

  return camera;
};
