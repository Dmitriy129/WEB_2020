const Bonus = Entity.extend({
    draw: function (ctx) {
        spriteManager.drawSprite(ctx, 'bonus', this.pos_x, this.pos_y)
    },
    update: function () {

    },
    kill: function () {

    }

})
