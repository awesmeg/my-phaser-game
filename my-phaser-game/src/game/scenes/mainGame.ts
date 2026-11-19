import { Scene } from "phaser";

export class MainGame extends Scene {
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  platforms: any;
  cursors: any;
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
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody(); // floor

    this.platforms.create(400, -17, "ground").setScale(1).refreshBody();
    this.platforms.create(400, 400, "ground").setScale(1).refreshBody();
    this.platforms.create(0, 250, "ground").setScale(1).refreshBody();

    this.player = this.physics.add.sprite(400, 300, "dude", 4);
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard?.createCursorKeys();

    // play anims
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 0,
        end: 3,
      }),
      repeat: -1,
      frameRate: 10,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 5,
        end: 8,
      }),
      repeat: -1,
      frameRate: 10,
      
    });

    this.anims.create({
      key: "stop",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 4,
        end: 4,
      }),
      repeat: -1,
      frameRate: 10,
    });

    this.physics.add.collider(this.player, this.platforms);
    this.player.setBounce(0.2);
  }

  update(time: number, delta: number): void {
    delta;
    time;

    const { left, right, up } = this.cursors;

    if (left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left");
    } else if (right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right");
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("stop")
    }

    if (up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-400);
    }
  }
}
