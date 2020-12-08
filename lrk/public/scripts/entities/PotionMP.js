const PotionMP = Entity.extend({
    move_x: 0,
    move_y: 0,
    speed: 0,
    type: 'PotionMP',

    update() {
    },

    onCollision(tileIndex) {
    },

    onEntityCollision(other) {
        if (other.name == 'Player') {
            // other.mp += 100
            other.mp += Math.round(Math.random() * 10)
            gameManager.remove(this)
            soundManager.play(gameManager.sounds.potion[1], { volume: 0.01 })
        }
    },

    onMoved(oldX, oldY) { // ?

    }
})
