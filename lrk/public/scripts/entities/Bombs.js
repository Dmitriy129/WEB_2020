const Bombs = Entity.extend({
    move_x: 0,
    move_y: 0,
    speed: 0.2,
    solid: false,
    type: 'Bombs',

    update() {
        physicsManager.update(this)
        this.move_x *= 0.9
        this.move_y *= 0.9
        if (Math.abs(this.move_x) < 0.01) this.move_x = 0
        if (Math.abs(this.move_y) < 0.01) this.move_y = 0
    },

    onCollision(tileIndex) {
        this.detionation()
    },

    onEntityCollision(other) {
        if (other.type !== 'Player') {
            this.detionation()
            if (other.hp != null) { if (other.type === 'Enemy') { other.hp -= 1 } }
        } /* else { gameManager.remove(this) } */
    },

    detionation() {
        gameManager.remove(this)
        soundManager.play(gameManager.sounds.bomb[0], { volume: 0.01 })
    },

    onMoved(oldX, oldY) { // ?

    }
})
