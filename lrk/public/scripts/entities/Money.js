const Money = Entity.extend({
  move_x: 0,
  move_y: 0,
  speed: 0.3,
  type: "Money",
  update() {
    physicsManager.update(this);
    this.move_x *= 0.8;
    this.move_y *= 0.8;
    if (Math.abs(this.move_x) < 0.001) this.move_x = 0;
    if (Math.abs(this.move_y) < 0.001) this.move_y = 0;
  },
  onCollision(tileIndex) {
    this.move_x = -this.move_x;
    this.move_y = -this.move_y;
  },
  onEntityCollision(other) {
    if (other.type === "Player") {
      other.money += 1;
      gameManager.remove(this);
      soundManager.play(gameManager.sounds.money[0]);
    }
    this.move_x =
      (this.pos_x - other.pos_x) * this.speed /* + other.speed */; /* / 2 */ // TODO normalize
    this.move_y =
      (this.pos_y - other.pos_y) * this.speed /* + other.speed */; /* / 2 */
  },
});
