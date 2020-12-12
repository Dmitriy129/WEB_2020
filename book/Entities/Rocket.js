const Rocket = Entity.extend({
    move_x: 0,
    move_y: 0,
    speed: 4,
    draw: function (ctx) {
        // spriteManager.drawSprite(ctx,"",this.pos_x,this.pos_y);
    },
    update: function () {
    },
    onTouchEntity: function (obj) {
        if (obj.name.match(/enemy[\d*]/) || obj.name.match(/player/) || obj.name.match(/rocket[\d*]/)) {
            obj.kill()
        }
        this.kill()
    },
    onTouchMap: function (idx) {
        this.kill()
    },
    kill: function () {
    }

})
