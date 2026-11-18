import { Scene } from "phaser";

export class MainGame extends Scene {
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  platforms: any;
  constructor() {
    super("mainGame");

    console.log("MainGame Constructor");
  }

  // what do you think
  preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("star", "assets/star.png");
    this.load.image("ground", "assets/platform.png");
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(400, 300, "sky");
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();

    this.player = this.physics.add.sprite(400, 300, "dude", 4);
  }

  update(time: number, delta: number): void {
    console.log("update:");
    delta;
    time;
  }
}
