const Finish = Entity.extend({
    move_x: 0,
    move_y: 0,
    speed: 0,
    type: 'Finish',

    update () {
        // physicsManager.update(this)
        // this.move_x *= 0.95
        // this.move_y *= 0.95
        // if (Math.abs(this.move_x) < 0.001) this.move_x = 0
        // if (Math.abs(this.move_y) < 0.001) this.move_y = 0
    },

    onCollision (tileIndex) {
        // this.move_x = -this.move_x
        // this.move_y = -this.move_y
    },

    onEntityCollision (other) {
        // this.move_x = (this.pos_x - other.pos_x) * (this.speed + other.speed) / 2 // TODO normalize
        // this.move_y = (this.pos_y - other.pos_y) * (this.speed + other.speed) / 2
        if (other.name === 'Player') {
            if (other.haveKey) {
                 console.log('next level') 
                 gameManager.nextLevel()
                } else {
                other.move_x *= -1
                other.move_y *= -1
                console.log('find key plz')
            }
        }
    },

    onMoved (oldX, oldY) { // ?

    }
})
