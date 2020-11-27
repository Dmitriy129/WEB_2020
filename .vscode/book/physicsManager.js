const physicsManager = {
    update: function (obj) {
        if (obj.move_x === 0 && obj.move_y === 0) {
            return 'stop'
        }
        const newX = obj.pos_x + Math.floor(obj.move_x * obj.speed)
        const newY = obj.pos_y + Math.floor(obj.move_y * obj.speed)
        const ts = mapManager.getTilesetIdx(newX + obj.size_x / 2, newY + obj.size_y / 2)
        const e = this.entityAtXY(obj, newX, newY)
        if (e !== null && obj.onTouchEntity) {
            // объект
            obj.onTouchEntity(e)
        }
        if (ts !== 2 && ts !== 7 && ts !== 31 && obj.onTouchEntity) {
            // препятствие
            // obj.onTouchEntity(ts)
        }
        if (ts !== 2 && ts !== 7 && ts !== 31 && (e === null || e.name.match(/finish_[\d]/))) {
            // перемещаем объект на свободное место
            obj.pos_x = newX
            obj.pos_y = newY
            gameManager.players_steps++
        } else {
            return 'break'
        }
        audioManager.playEvent(audioManager.stepsSoung)
        return 'move'
    },

    moveBox: function (obj, player, moveX, moveY) {
        const newX = player.pos_x + Math.floor(player.move_x * player.speed)
        const newY = player.pos_y + Math.floor(player.move_y * player.speed)

        if (this.updateBox(obj, moveX, moveY) === 'move') {
            player.pos_x = newX
            player.pos_y = newY
            gameManager.players_steps++
        }
    },

    updateBox: function (obj, moveX, moveY) {
        const newX = obj.pos_x + Math.floor(moveX * obj.speed)
        const newY = obj.pos_y + Math.floor(moveY * obj.speed)

        const ts = mapManager.getTilesetIdx(newX + obj.size_x / 2, newY + obj.size_y / 2)
        const e = this.entityAtXY(obj, newX, newY)

        if (e !== null && e.name.match(/finish_[\d]/)) {
            // объект
            obj.onTouchEntity(e)
        }
        if (ts !== 2 && ts !== 7 && ts !== 31 && (e === null || e.name.match(/finish_[\d]/))) {
            // препятсвие
            obj.pos_x = newX
            obj.pos_y = newY
            obj.moved++
            console.log(obj.moved)
            if (e !== null && e.name.match(/finish_[\d]/) && obj.color === e.color) {
                obj.status = true
            } else {
                obj.status = false
            }
        } else {
            return 'break'
        }
        audioManager.playEvent(audioManager.stepsSoung)
        audioManager.playEvent(audioManager.boxSoung)
        return 'move'
    },

    // Проверить коллизии с объектом obj
    entityAtXY: function (obj, x, y) {
        for (let i = 0; i < gameManager.entities.length; i++) {
            const e = gameManager.entities[i]
            if (e.name !== obj.name) {
                if (
                    x + obj.size_x < e.pos_x ||
                    y + obj.size_y < e.pos_y ||
                    x > e.pos_x + e.size_x ||
                    y > e.pos_y + e.size_y
                ) {
                    continue
                }
                return e
            }
        }
        return null
    }
}
