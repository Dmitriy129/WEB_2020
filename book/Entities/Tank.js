const Tank = Entity.extend({
    lifetime: 100,
    move_x: 0,
    move_y: 0,
    speed: -1,
    draw: function (ctx) {
        spriteManager.drawSprite(ctx, 'tank', this.pos_x, this.pos_y)
    },
    update: function () {
    },
    onTouchEntity: function (obj) {

    },
    kill: function () {
    },
    fire: function () {

    }
})
