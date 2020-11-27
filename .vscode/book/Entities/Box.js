const Box = Entity.extend({
    move_x: 0,
    move_y: 0,
    speed: 64,
    moved: 0,
    status: false,
    draw: function (ctx) {
        let spriteName
        switch (this.color) {
        case 'red': spriteName = 'Red_'; break
        case 'yellow': spriteName = 'Yellow_'; break
        case 'brown': spriteName = 'Brown_'; break
        default: spriteName = 'Brown_'
        }
        if (this.status) {
            spriteName += '2'
        } else {
            spriteName += '1'
        }
        spriteManager.drawSprite(ctx, spriteName, this.pos_x, this.pos_y, 0, 0)
    },
    update: function () {

    },
    onTouchEntity: function (obj) {

    },
    kill: function () {
    }

})
