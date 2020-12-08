const Ghost = Entity.extend({
    move_x: 0,
    move_y: 0,
    speed: 1,
    hp: 2,
    type: 'Enemy',

    update() {
        // console.log("waste upd")
        if (this.hp <= 0) {
            gameManager.remove(this)
            return
        }
        physicsManager.update(this)
        this.move_x *= 0.8
        this.move_y *= 0.8
        if (Math.abs(this.move_x) < 0.001) this.move_x = 0
        if (Math.abs(this.move_y) < 0.001) this.move_y = 0

        /*  */

        const dx = gameManager.player?.pos_x - this.pos_x
        const dy = gameManager.player?.pos_y - this.pos_y
        const max = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy)

        // console.log('object', dx, dy)
        if (max <= 200) {
            this.move_x = dx / max
            this.move_y = dy / max
        }

        /*  */
    },

    onCollision(tileIndex) {
        this.move_x = -this.move_xd
        this.move_y = -this.move_y
    },

    onEntityCollision(other) {
        if (other.type === 'Player') {
            gameManager.remove(this)
            other.hp -= 1
            soundManager.play(gameManager.sounds.damage[1], { volume: 1 })
        }
        this.move_x = (this.pos_x - other?.pos_x) * (this.speed /* + other.speed */) /* / 2 */ // TODO normalize
        this.move_y = (this.pos_y - other?.pos_y) * (this.speed /* + other.speed */) /* / 2 */
    },

    onMoved(oldX, oldY) { // ?

    }
})
