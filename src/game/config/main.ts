import { Types } from 'phaser';
import { MainScene } from '../scenes';

export const main: Types.Core.GameConfig = {
  //@TODO: Consider explicitly setting the game size here instead of relying on the containers size
  width: '100%',
  height: '100%',
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  render: {
    antialias: false,
    pixelArt: true,
    roundPixels: true
  },
  scene: MainScene
};
