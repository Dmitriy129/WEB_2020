const PotionMP = Entity.extend({
    move_x: 0,
    move_y: 0,
    speed: 0,

    update() {
    },

    onCollision(tileIndex) {
    },

    onEntityCollision(other) {
        if (other.name = "Player") {
            other.mp += 100
            console.log("then delete this object")
        }
    },

    onMoved(oldX, oldY) { // ?

    }
})
