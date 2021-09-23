import { Scene, Cameras, Physics } from "phaser";
import { initializeControls, Controls, updateSpritePositionWithVelocity } from "../controls";
import { initializeCamera } from "../camera";

export class MainScene extends Scene {
  private camera!: Cameras.Scene2D.Camera;
  private player!: Physics.Arcade.Sprite;
  private controls!: Controls;
  private movementSpeed: number = 400;

  init() {
    this.controls = initializeControls(this);
    this.camera = initializeCamera(this);
  }

  preload() {
    this.load.image('red-square', `${process.env.PUBLIC_URL}/sprites/red-square.png`);
  }

  create() {
    this.player = this.physics.add.sprite(320, 240, 'red-square');
    this.player.setCollideWorldBounds(true);
  }

  update() {
    updateSpritePositionWithVelocity(this.controls, this.player, this.movementSpeed);
  }
}
