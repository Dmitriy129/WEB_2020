const Finish = Entity.extend({
    move_x: 0,
    move_y: 0,
    speed: 0,
    type: 'Finish',
    onEntityCollision (other) {
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
})
