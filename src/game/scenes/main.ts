import { Scene, GameObjects, Cameras } from "phaser";
import { initializeControls, updatePlayerPosition, Controls } from "../controls";
import { initializeCamera } from "../camera";

export class MainScene extends Scene {
  private camera!: Cameras.Scene2D.Camera;
  private player!: GameObjects.Sprite;
  private controls!: Controls;
  private movementSpeed: number = 10;

  init() {
    this.controls = initializeControls(this);
    this.camera = initializeCamera(this);
  }

  preload() {
    this.load.image('red-square', `${process.env.PUBLIC_URL}/sprites/red-square.png`);
  }

  create() {
    this.player = this.add.sprite(320, 240, 'red-square');
  }

  update() {
    updatePlayerPosition(this.controls, this.player, this.movementSpeed);
  }
}
