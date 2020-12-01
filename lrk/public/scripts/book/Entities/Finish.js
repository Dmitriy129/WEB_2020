const Finish = Entity.extend({
    move_x: 0,
    move_y: 0,
    status: false,
    draw: function (ctx) {
        if (!this.status) {
            let spriteName
            switch (this.color) {
            case 'red': spriteName = 'End_Red'; break
            case 'yellow': spriteName = 'End_Yellow'; break
            case 'brown': spriteName = 'End_Brown'; break
            default: spriteName = 'End_Brown'
            }

            spriteManager.drawSprite(ctx, spriteName, this.pos_x, this.pos_y, 0, 0)
        }
    },
    update: function () {
        const e = physicsManager.entityAtXY(this, this.pos_x, this.pos_y)
        if (e !== null && e.name.match(/box_[\d]/) && this.color === e.color) {
            this.status = true
        } else {
            this.status = false
        }
    }

})
