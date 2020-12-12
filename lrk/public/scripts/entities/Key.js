const Key = Entity.extend({
    move_x: 0,
    move_y: 0,
    speed: 0.3,
    type: 'Key',
    update() {
        physicsManager.update(this)
        this.move_x *= 0.9
        this.move_y *= 0.9
        if (Math.abs(this.move_x) < 0.1) this.move_x = 0
        if (Math.abs(this.move_y) < 0.1) this.move_y = 0
    },
    onCollision(tileIndex) {
        this.move_x = -this.move_x
        this.move_y = -this.move_y
    },
    onEntityCollision(other) {
        this.move_x = (this.pos_x - other.pos_x) * (this.speed /* + other.speed */) /* / 2 */ // TODO normalize
        this.move_y = (this.pos_y - other.pos_y) * (this.speed /* + other.speed */) /* / 2 */
        if (other.name === 'Player') {
            other.haveKey = true
            soundManager.play(gameManager.sounds.money[0], { volume: 0.75 })
            gameManager.remove(this)
        }
    },
})
