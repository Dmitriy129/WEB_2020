const PotionHP = Entity.extend({
  move_x: 0,
  move_y: 0,
  speed: 0,
  type: "PotionHP",
  onEntityCollision(other) {
    if (other.name === "Player") {
      other.hp += Math.round(Math.random() * 2);
      gameManager.remove(this);
      soundManager.play(gameManager.sounds.potion[0]);
    }
  },
});
