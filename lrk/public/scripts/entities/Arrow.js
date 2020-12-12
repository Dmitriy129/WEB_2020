const Arrow = Entity.extend({
  move_x: 0,
  move_y: 0,
  speed: 0.2,
  solid: false,
  type: "Arrow",
  update() {
    physicsManager.update(this);
    this.move_x *= 0.9;
    this.move_y *= 0.9;
    if (Math.abs(this.move_x) < 5 && Math.abs(this.move_y) < 5)
      gameManager.remove(this);
  },
  onCollision(tileIndex) {
    gameManager.remove(this);
  },
  onEntityCollision(other) {
    if (other.type !== "Enemy") {
      gameManager.remove(this);
      if (other.hp != null) {
        if (other.type === "Player") {
          other.hp -= 1;
          soundManager.play(gameManager.sounds.damage[2]);
        }
      }
    }
  },
});
