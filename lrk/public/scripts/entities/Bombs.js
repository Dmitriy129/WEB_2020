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
        this.detonation()
    },
    onEntityCollision(other) {
        if (other.type !== 'Player') {
            this.detonation()
            if (other.hp != null) { if (other.type === 'Enemy') { other.hp -= 1 } }
        }
    },
    detonation() {
        gameManager.remove(this)
        soundManager.play(gameManager.sounds.bomb[Math.round(Math.random()*2)], { volume: 0.01 })
    },
})
