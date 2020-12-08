const PotionHP = Entity.extend({
    move_x: 0,
    move_y: 0,
    speed: 0,
    type: 'PotionHP',

    update() {
        // console.log('speed', this.speed)
        // console.log('move_x', this.move_x)
        // console.log('move_y', this.move_y)
    },

    onCollision(tileIndex) {
    },

    onEntityCollision(other) {
        if (other.name === 'Player') {
            other.hp += Math.round(Math.random() * 2)
            gameManager.remove(this)
            soundManager.play(gameManager.sounds.potion[0], { volume: 0.01 })

        }
    },

    onMoved(oldX, oldY) { // ?

    }
})
