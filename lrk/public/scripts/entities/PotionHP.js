const PotionHP = Entity.extend({
    move_x: 0,
    move_y: 0,
    speed: 0,

    update() {
        // console.log('speed', this.speed)
        // console.log('move_x', this.move_x)
        // console.log('move_y', this.move_y)
    },

    onCollision(tileIndex) {
    },

    onEntityCollision(other) {
        if (other.name = "Player") {
            other.hp += 100
            console.log("then delete this object")

        }
    },

    onMoved(oldX, oldY) { // ?

    }
})
