const Skeleton = Entity.extend({
    // Main
    hp: 3,
    mp: 100,
    lifetime: 100,
    score: 0,
    // Physics
    move_x: 0,
    move_y: 1,
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

        /*  */

        const dx = gameManager.player.pos_x - this.pos_x
        const dy = gameManager.player.pos_y - this.pos_y
        const max = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy)

        // console.log('object', dx, dy)
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
        // arrow.move_x = 5
        // arrow.move_y = 5
        // arrow.move_x = Math.abs(b / k * target.x) < 64 ? b / k * target.x : 64 / k * target.x - mapManager.tSize.x
        // arrow.move_y = Math.abs(b / k * target.y) < 64 ? b / k * target.y : 64 / k * target.y /* - mapManager.tSize.y */
        arrow.move_x = b / k * target.x - mapManager.tSize.x / 2
        arrow.move_y = b / k * target.y
        soundManager.play(gameManager.sounds.fire[1], { volume: 0.3 })


    },
    // fire: function (x2, y2) {
    //     console.log("fire")
    //     if (!this.canFire) return
    //     this.canFire = false
    //     this.canFireT = setTimeout(() => {
    //         clearTimeout(this.canFireT)
    //         this.canFire = true
    //     }, 1000)
    //     if (this.mp-- <= 0) return

    //     // const event = eventsManager.action.fire
    //     const { pos_x: x1, pos_y: y1 } = this
    //     // const { clientX: x2, clientY: y2 } = event
    //     // const { pos_x: x2, pos_y: y2 } = gameManager.player


    //     const spawn = {
    //         x: x1,
    //         y: y1 + mapManager.tSize.y

    //     }
    //     const target = {
    //         x: x2 / 2 + mapManager.view.x - spawn.x /* + Math.random() * 64 - 32 */,
    //         y: y2 / 2 + mapManager.view.y - spawn.y + mapManager.tSize.y / 2 /* + Math.random() * 64 - 32 */
    //     }
    //     const a = mapManager.tSize.x * Math.sqrt(2)
    //     const b = 64 * Math.sqrt(2)
    //     const k = Math.sqrt(Math.pow(target.x, 2) + Math.pow(target.y, 2))

    //     const dx = a / k * target.x - mapManager.tSize.x / 4
    //     const dy = a / k * target.y
    //     const arrow = gameManager.genObj({
    //         type: 'Arrow',
    //         gid: '127',
    //         x: spawn.x + dx,
    //         y: spawn.y + dy,
    //         width: 16,
    //         height: 16
    //     })
    //     // arrow.move_x = 5
    //     // arrow.move_y = 5
    //     // arrow.move_x = Math.abs(b / k * target.x) < 64 ? b / k * target.x : 64 / k * target.x - mapManager.tSize.x
    //     // arrow.move_y = Math.abs(b / k * target.y) < 64 ? b / k * target.y : 64 / k * target.y /* - mapManager.tSize.y */
    //     arrow.move_x = b / k * target.x - mapManager.tSize.x / 2
    //     arrow.move_y = b / k * target.y
    //     // eventsManager.action.fire = false
    // },

    onEntityCollision(other) {
        if (other.type === 'Player') {
            gameManager.remove(this)
            other.hp -= 1
        }
        this.move_x = (this.pos_x - other.pos_x) * (this.speed /* + other.speed */) /* / 2 */ // TODO normalize
        this.move_y = (this.pos_y - other.pos_y) * (this.speed /* + other.speed */) /* / 2 */
    },

    // onTouchEntity: function (obj) {
    //     // Или TODO
    //     // if (obj.name.match(/box_[\d]/)) {
    //     //     physicManager.moveBox(obj, this, this.move_x, this.move_y)
    //     //     audioManager.playEvent()
    //     // }
    //     soundManager.play('music/gift.wav', {
    //         looping: false,
    //         volume: 1
    //     })
    //     this.Score = this.Score + 5
    //     document.getElementById('Score').innerHTML = 'Очки: ' + this.Score
    //     obj.kill()
    // },

    // kill: function () {
    //     gameManager.kill(this)
    // }
})
