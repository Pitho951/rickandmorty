import Phaser from "phaser";

type GamePhase = "start" | "playing" | "gameOver";

const GAME_WIDTH = 960;
const GAME_HEIGHT = 540;
const PLAYER_SPEED = 245;
const DAMAGE_COOLDOWN = 900;

export class PortalRunnerScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: Record<"W" | "A" | "S" | "D" | "ENTER" | "R", Phaser.Input.Keyboard.Key>;
  private crystals!: Phaser.Physics.Arcade.Group;
  private enemies!: Phaser.Physics.Arcade.Group;
  private scoreText!: Phaser.GameObjects.Text;
  private livesText!: Phaser.GameObjects.Text;
  private titleText!: Phaser.GameObjects.Text;
  private helperText!: Phaser.GameObjects.Text;
  private finalScoreText?: Phaser.GameObjects.Text;
  private score = 0;
  private lives = 3;
  private phase: GamePhase = "start";
  private lastDamageAt = 0;
  private enemySpeed = 92;
  private nextEnemyScore = 4;
  private shipFacingLeft = false;

  constructor() {
    super("PortalRunnerScene");
  }

  preload() {
    this.load.image("ship", "/assets/images/ship.webp");
  }

  create() {
    this.createTextures();
    this.createBackground();

    this.crystals = this.physics.add.group();
    this.enemies = this.physics.add.group();

    this.player = this.physics.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, "ship");
    this.player.setDisplaySize(90, 51);
    this.player.setCircle(22, 23, 4);
    this.player.setCollideWorldBounds(true);
    this.player.setVisible(false);

    this.physics.add.overlap(this.player, this.crystals, this.collectCrystal, undefined, this);
    this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, undefined, this);

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.keys = this.input.keyboard!.addKeys("W,A,S,D,ENTER,R") as typeof this.keys;

    this.scoreText = this.add.text(24, 18, "Score: 0", this.hudStyle()).setDepth(5);
    this.livesText = this.add.text(GAME_WIDTH - 24, 18, "Vidas: 3", this.hudStyle()).setOrigin(1, 0).setDepth(5);

    this.titleText = this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 48, "Portal Runner", {
        fontFamily: "Orbitron, Arial, sans-serif",
        fontSize: "56px",
        fontStyle: "900",
        color: "#b8ff52",
        stroke: "#06331c",
        strokeThickness: 8,
        shadow: { color: "#39ff88", blur: 18, fill: true },
      })
      .setOrigin(0.5)
      .setDepth(10);

    this.helperText = this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 34, "Pressione Enter para começar", {
        fontFamily: "Orbitron, Arial, sans-serif",
        fontSize: "20px",
        color: "#f4ffcf",
      })
      .setOrigin(0.5)
      .setDepth(10);

    this.showStartScreen();
  }

  update(time: number) {
    if (this.phase === "start" && Phaser.Input.Keyboard.JustDown(this.keys.ENTER)) {
      this.startGame();
      return;
    }

    if (this.phase === "gameOver" && (Phaser.Input.Keyboard.JustDown(this.keys.R) || Phaser.Input.Keyboard.JustDown(this.keys.ENTER))) {
      this.startGame();
      return;
    }

    if (this.phase !== "playing") {
      return;
    }

    this.movePlayer();
    this.updateEnemies();

    if (time - this.lastDamageAt > DAMAGE_COOLDOWN) {
      this.player.clearTint();
    }
  }

  private createTextures() {
    const portal = this.add.graphics();
    portal.lineStyle(6, 0xb8ff52, 0.95);
    portal.strokeCircle(24, 24, 18);
    portal.fillStyle(0x39ff88, 0.45);
    portal.fillCircle(24, 24, 13);
    portal.fillStyle(0xe6ffb4, 0.9);
    portal.fillCircle(24, 24, 5);
    portal.generateTexture("portalCrystal", 48, 48);
    portal.destroy();

    const enemy = this.add.graphics();
    enemy.fillStyle(0x6e1b9a, 1);
    enemy.fillCircle(22, 22, 20);
    enemy.lineStyle(5, 0xff315d, 1);
    enemy.strokeCircle(22, 22, 18);
    enemy.fillStyle(0xff75aa, 0.9);
    enemy.fillCircle(15, 16, 4);
    enemy.fillCircle(29, 16, 4);
    enemy.generateTexture("enemyOrb", 44, 44);
    enemy.destroy();
  }

  private createBackground() {
    this.cameras.main.setBackgroundColor("#080b12");

    const grid = this.add.graphics();
    grid.lineStyle(1, 0x1cff8a, 0.12);
    for (let x = 0; x <= GAME_WIDTH; x += 48) {
      grid.lineBetween(x, 0, x, GAME_HEIGHT);
    }
    for (let y = 0; y <= GAME_HEIGHT; y += 48) {
      grid.lineBetween(0, y, GAME_WIDTH, y);
    }

    for (let index = 0; index < 36; index += 1) {
      const x = Phaser.Math.Between(24, GAME_WIDTH - 24);
      const y = Phaser.Math.Between(24, GAME_HEIGHT - 24);
      const star = this.add.circle(x, y, Phaser.Math.Between(1, 3), 0xb8ff52, Phaser.Math.FloatBetween(0.25, 0.8));
      this.tweens.add({
        targets: star,
        alpha: Phaser.Math.FloatBetween(0.15, 0.9),
        duration: Phaser.Math.Between(900, 1800),
        yoyo: true,
        repeat: -1,
      });
    }
  }

  private showStartScreen() {
    this.phase = "start";
    this.scoreText.setVisible(false);
    this.livesText.setVisible(false);
    this.titleText.setText("Portal Runner").setVisible(true);
    this.helperText.setText("Pressione Enter para começar").setVisible(true);
    this.finalScoreText?.destroy();
    this.player.setVisible(false);
    this.crystals.clear(true, true);
    this.enemies.clear(true, true);
  }

  private startGame() {
    this.phase = "playing";
    this.score = 0;
    this.lives = 3;
    this.enemySpeed = 92;
    this.nextEnemyScore = 4;
    this.lastDamageAt = 0;

    this.titleText.setVisible(false);
    this.helperText.setVisible(false);
    this.finalScoreText?.destroy();
    this.scoreText.setVisible(true);
    this.livesText.setVisible(true);
    this.updateHud();

    this.crystals.clear(true, true);
    this.enemies.clear(true, true);

    this.player.setPosition(GAME_WIDTH / 2, GAME_HEIGHT / 2);
    this.player.setVelocity(0, 0);
    this.player.setAngle(0);
    this.player.setFlipX(false);
    this.shipFacingLeft = false;
    this.player.clearTint();
    this.player.setVisible(true);

    for (let index = 0; index < 7; index += 1) {
      this.spawnCrystal();
    }

    for (let index = 0; index < 3; index += 1) {
      this.spawnEnemy();
    }
  }

  private movePlayer() {
    const left = this.cursors.left?.isDown || this.keys.A.isDown;
    const right = this.cursors.right?.isDown || this.keys.D.isDown;
    const up = this.cursors.up?.isDown || this.keys.W.isDown;
    const down = this.cursors.down?.isDown || this.keys.S.isDown;

    const vx = Number(right) - Number(left);
    const vy = Number(down) - Number(up);

    const velocity = new Phaser.Math.Vector2(vx, vy);
    if (velocity.lengthSq() > 0) {
      velocity.normalize().scale(PLAYER_SPEED);
    }
    this.player.setVelocity(velocity.x, velocity.y);

    if (vx < 0) this.shipFacingLeft = true;
    else if (vx > 0) this.shipFacingLeft = false;
    this.player.setFlipX(this.shipFacingLeft);

    // Tilt: sign inverts when flipped so the nose always dips in the direction of travel.
    // Horizontal banking (+10°) + vertical pitch (±12°), lerped for smoothness.
    const sign = this.shipFacingLeft ? -1 : 1;
    const targetAngle = (vx !== 0 || vy !== 0)
      ? sign * ((vx !== 0 ? 10 : 0) + vy * 12)
      : 0;

    this.player.angle = Phaser.Math.Linear(this.player.angle, targetAngle, 0.18);
  }

  private updateEnemies() {
    this.enemies.getChildren().forEach((enemyObject) => {
      const enemy = enemyObject as Phaser.Physics.Arcade.Sprite;
      this.physics.moveToObject(enemy, this.player, this.enemySpeed);
      enemy.setAngularVelocity(enemy.body!.velocity.x > 0 ? 90 : -90);
    });
  }

  private collectCrystal(_player: Phaser.Types.Physics.Arcade.GameObjectWithBody, crystalObject: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
    const crystal = crystalObject as Phaser.Physics.Arcade.Sprite;
    crystal.destroy();

    this.score += 1;
    this.updateHud();
    this.spawnCrystal();

    this.cameras.main.flash(90, 38, 255, 136, false);

    if (this.score >= this.nextEnemyScore) {
      this.enemySpeed = Math.min(188, this.enemySpeed + 10);
      this.spawnEnemy();
      this.nextEnemyScore += 5;
    }
  }

  private hitEnemy(_player: Phaser.Types.Physics.Arcade.GameObjectWithBody, enemyObject: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
    if (this.time.now - this.lastDamageAt < DAMAGE_COOLDOWN) {
      return;
    }

    const enemy = enemyObject as Phaser.Physics.Arcade.Sprite;
    this.lastDamageAt = this.time.now;
    this.lives -= 1;
    this.updateHud();
    this.player.setTint(0xff315d);
    this.cameras.main.shake(120, 0.008);

    const push = new Phaser.Math.Vector2(this.player.x - enemy.x, this.player.y - enemy.y).normalize().scale(260);
    this.player.setVelocity(push.x, push.y);

    if (this.lives <= 0) {
      this.endGame();
    }
  }

  private spawnCrystal() {
    const { x, y } = this.randomPointAwayFromPlayer(90);
    const crystal = this.crystals.create(x, y, "portalCrystal") as Phaser.Physics.Arcade.Sprite;
    crystal.setCircle(18, 6, 6);
    crystal.setDepth(2);
    crystal.setBlendMode(Phaser.BlendModes.ADD);
    this.tweens.add({
      targets: crystal,
      scale: { from: 0.85, to: 1.12 },
      alpha: { from: 0.7, to: 1 },
      duration: 720,
      yoyo: true,
      repeat: -1,
    });
  }

  private spawnEnemy() {
    const { x, y } = this.randomPointAwayFromPlayer(180);
    const enemy = this.enemies.create(x, y, "enemyOrb") as Phaser.Physics.Arcade.Sprite;
    enemy.setCircle(19, 3, 3);
    enemy.setCollideWorldBounds(true);
    enemy.setBounce(1);
    enemy.setDepth(3);
  }

  private randomPointAwayFromPlayer(minDistance: number) {
    for (let attempt = 0; attempt < 30; attempt += 1) {
      const x = Phaser.Math.Between(52, GAME_WIDTH - 52);
      const y = Phaser.Math.Between(64, GAME_HEIGHT - 52);
      if (!this.player?.visible || Phaser.Math.Distance.Between(x, y, this.player.x, this.player.y) >= minDistance) {
        return { x, y };
      }
    }

    return { x: Phaser.Math.Between(52, GAME_WIDTH - 52), y: Phaser.Math.Between(64, GAME_HEIGHT - 52) };
  }

  private endGame() {
    this.phase = "gameOver";
    this.player.setVisible(false);
    this.player.setVelocity(0, 0);
    this.crystals.clear(true, true);
    this.enemies.clear(true, true);

    this.titleText.setText("Game Over").setVisible(true);
    this.helperText.setText("Pressione R ou Enter para reiniciar").setVisible(true);
    this.finalScoreText = this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 4, `Pontuação final: ${this.score}`, {
        fontFamily: "Orbitron, Arial, sans-serif",
        fontSize: "24px",
        color: "#ffffff",
      })
      .setOrigin(0.5)
      .setDepth(10);
  }

  private updateHud() {
    this.scoreText.setText(`Score: ${this.score}`);
    this.livesText.setText(`Vidas: ${this.lives}`);
  }

  private hudStyle(): Phaser.Types.GameObjects.Text.TextStyle {
    return {
      fontFamily: "Orbitron, Arial, sans-serif",
      fontSize: "20px",
      color: "#e6ffb4",
      stroke: "#04150e",
      strokeThickness: 4,
    };
  }
}

