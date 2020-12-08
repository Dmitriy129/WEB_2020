const Player = Entity.extend({
    // Main
    hp: 3,
    mp: 100,
    lifetime: 100,
    score: 0,
    // Physics
    move_x: 0,
    move_y: 1,
    _speed: 4,
    speed: 4,
    money: 10,
    type: 'Player',
    canFire: true,

    // Visual
    // dirSprite: null,
    // curFrame: 0,

    // draw: function (ctx) {
    //     // spriteManager.drawSprite(ctx, spriteManager.getSpriteByName('Misc_tree_top'), this.pos_x, this.pos_y)
    //     // Или TODO
    //     // let spriteName
    //     // switch (this.direction) {
    //     // case -1:spriteName = 'Left_1'; break
    //     // case 1:spriteName = 'Right_1'; break
    //     // case -2:spriteName = 'Up_1'; break
    //     // case 2:spriteName = 'Down_1'; break
    //     // }
    //     // spriteManager.drawSprite(ctx, spriteName, this.pos_x, this.pos_y, 0, 0)

    //     // this.curFrame++
    //     // if (this.curFrame > 14) {
    //     //     this.curFrame = 0
    //     // }
    // },
    draw: function (ctx) {
        spriteManager.drawSprite(ctx, spriteManager.getSpriteBySpriteId(this.gid), this.pos_x, this.pos_y, this.direction)
    },

    update() {
        if (this.hp <= 0) {
            soundManager.play(gameManager.sounds.loose[0], { volume: 0.2 })
            alert('Ну ты умер, поздравлю')
            gameManager.endGame()

            // window.location.reload()
        }
        this.move_x /= 1.3
        this.move_y /= 1.3
        if (eventsManager.action.up) this.move_y = -1
        if (eventsManager.action.down) this.move_y = 1
        if (eventsManager.action.left) this.move_x = -1
        if (eventsManager.action.right) this.move_x = 1
        if (eventsManager.action.fire) this.fire()
        // const result = physicsManager.update(this)
        if (eventsManager.action.nitro) {
            if (this.mp > 0) {
                this.mp -= Math.random()
                this.speed = this._speed * 2
            }
        }
        else if (eventsManager.action.slow) {
            this.mp += Math.random() * (this.move_y ? 1 : 1.2) * (this.move_x ? 1 : 1.2)
            this.speed = this._speed / 4
        }
        else this.speed = this._speed

        if (Math.abs(this.move_x) < 0.1) this.move_x = 0
        if (Math.abs(this.move_y) < 0.1) this.move_y = 0
        physicsManager.update(this)
        // console.log('this.move_x,this.move_y', this.move_x,this.move_y)
    },

    // onCollision (tileIndex) {
    //     this.move_x = -this.move_xd
    //     this.move_y = -this.move_y
    // },
    onEntityCollision(other) {
        if (other.type === 'Arrow') {
            soundManager.play(gameManager.sounds.damage[1], { volume: 0.5 })
        }
    },


    fire: function () {
        if (!this.canFire) return
        this.canFire = false
        this.canFireT = setTimeout(() => {
            clearTimeout(this.canFireT)
            this.canFire = true
        }, 300)
        if (this.mp-- <= 0) return

        const event = eventsManager.action.fire
        const { pos_x: x1, pos_y: y1 } = this
        const { clientX: x2, clientY: y2 } = event

        const spawn = {
            x: x1,
            y: y1 + mapManager.tSize.y

        }
        const target = {
            x: x2 / 2 + mapManager.view.x - spawn.x,
            y: y2 / 2 + mapManager.view.y - spawn.y + mapManager.tSize.y / 2
        }
        const a = mapManager.tSize.x * Math.sqrt(2)
        const b = 64 * Math.sqrt(2)
        const k = Math.sqrt(Math.pow(target.x, 2) + Math.pow(target.y, 2))

        const dx = a / k * target.x - mapManager.tSize.x / 4
        const dy = a / k * target.y
        const arrow = gameManager.genObj({
            type: 'Bombs',
            gid: '43',
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
        soundManager.play(gameManager.sounds.fire[1], { volume: 0.01 })


        // eventsManager.action.fire = false
    }

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
