const Skeleton = Entity.extend({
    hp: 3,
    mp: 100,
    lifetime: 100,
    score: 0,
    move_x: 0,
    move_y: 0,
    speed: 2,
    money: 10,
    type: 'Enemy',
    canFire: true,
    update() {
        if (this.hp <= 0) {
            gameManager.remove(this)
            return
        }
        physicsManager.update(this)
        this.move_x *= 0.8
        this.move_y *= 0.8
        if (Math.abs(this.move_x) < 0.001) this.move_x = 0
        if (Math.abs(this.move_y) < 0.001) this.move_y = 0

        const dx = gameManager.player.pos_x - this.pos_x
        const dy = gameManager.player.pos_y - this.pos_y
        const max = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy)

        if (max <= 200 && max >= 100) {
            this.move_x = dx / max
            this.move_y = dy / max
        }
        else if (max < 80) {
            this.move_x = -dx / max
            this.move_y = -dy / max
        }
        if (max <= 200) this.fire(gameManager.player.pos_x, gameManager.player.pos_y)

    },
    fire: function (x2, y2) {
        if (!this.canFire) return
        this.canFire = false
        this.canFireT = setTimeout(() => {
            clearTimeout(this.canFireT)
            this.canFire = true
        }, 1000)
        if (this.mp-- <= 0) return

        const { pos_x: x1, pos_y: y1 } = this

        const spawn = {
            x: x1,
            y: y1 + mapManager.tSize.y
        }
        const target = {
            x: x2 - spawn.x + Math.random() * 100 - 50,
            y: y2 - spawn.y + mapManager.tSize.y / 2 + Math.random() * 100 - 50
        }
        const a = mapManager.tSize.x * Math.sqrt(2)
        const b = 100 * Math.sqrt(2)
        const k = Math.sqrt(Math.pow(target.x, 2) + Math.pow(target.y, 2))

        const dx = a / k * target.x - mapManager.tSize.x / 4
        const dy = a / k * target.y
        const arrow = gameManager.genObj({
            type: 'Arrow',
            gid: '128',
            x: spawn.x + dx,
            y: spawn.y + dy,
            width: 16,
            height: 16
        })
        arrow.move_x = b / k * target.x - mapManager.tSize.x / 2
        arrow.move_y = b / k * target.y
        soundManager.play(gameManager.sounds.fire[0], { volume: 0.3 })
    },
    onEntityCollision(other) {
        if (other.type === 'Player') {
            gameManager.remove(this)
            other.hp -= 1
        }
        this.move_x = (this.pos_x - other.pos_x) * (this.speed /* + other.speed */) /* / 2 */ // TODO normalize
        this.move_y = (this.pos_y - other.pos_y) * (this.speed /* + other.speed */) /* / 2 */
    },
})
