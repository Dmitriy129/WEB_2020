const Player = Entity.extend({
    // Main
    hp: 100,
    mp: 100,
    lifetime: 100,
    score: 0,
    // Physics
    move_x: 0,
    move_y: 1,
    speed: 4,
    mass: 60,
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
    update() {
        // console.log("pl upd")
        // console.log('this.move_x', this.move_x)
        // console.log('this.move_y', this.move_y)
        this.move_x /= 1.5
        this.move_y /= 1.5
        if (eventsManager.action.up) this.move_y = -1
        if (eventsManager.action.down) this.move_y = 1
        if (eventsManager.action.left) this.move_x = -1
        if (eventsManager.action.right) this.move_x = 1
        if (eventsManager.action.fire) this.fire()
        // const result = physicsManager.update(this)

        if (Math.abs(this.move_x) < 0.1) this.move_x = 0
        if (Math.abs(this.move_y) < 0.1) this.move_y = 0



        physicsManager.update(this)
    },

    fire() {

    }

    // fire: function () {
    //     const r = Object.create(Rocket)
    //     r.size_x = 32
    //     r.size_y = 32
    //     r.name = 'rocket' + (++gameManager.fireNum)
    //     r.move_x = this.move_x
    //     r.move_y = this.move_y
    //     switch (this.move_x + 2 * this.move_y) {
    //     case -1:
    //         r.pos_x = this.pos_x - r.size_x
    //         r.pos_y = this.pos_y
    //         break
    //     case 1:
    //         r.pos_x = this.pos_x + r.size_x
    //         r.pos_y = this.pos_y
    //         break
    //     case -2:
    //         r.pos_x = this.pos_x
    //         r.pos_y = this.pos_y - r.size_y
    //         break
    //     case 2:
    //         r.pos_x = this.pos_x
    //         r.pos_y = this.pos_y + r.size_y
    //         break
    //     default:
    //         return
    //     }
    //     gameManager.entities.push(r)
    // },

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
