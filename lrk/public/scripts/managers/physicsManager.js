const physicsManager = {
    update: function (entity) {
        if (entity.move_x === 0 && entity.move_y === 0) return
        const newX = entity.pos_x + Math.round(entity.move_x * entity.speed)
        const newY = entity.pos_y + Math.round(entity.move_y * entity.speed)
        const newCenterX = newX + entity.size_x / 2
        const newCenterY = newY + entity.size_y / 2
        let spriteId = null
        let destinationSprite = null
        let destinationEntity = null
        // Check inbounds
        if (newCenterX > 0 && newCenterX < mapManager.mapSize.x && newCenterY > 0 && newCenterY < mapManager.mapSize.y) {
            spriteId = mapManager.getSpriteId(newCenterX, newCenterY)
            destinationSprite = spriteManager.getSpriteBySpriteId(spriteId)
            destinationEntity = this.entityAtXY(entity, newX, newY)
        }

        if (destinationEntity !== null) {
            // Collision with entity
            entity.onEntityCollision(destinationEntity)
            destinationEntity.onEntityCollision(entity)
        } else {
            if (destinationSprite === null) {
                // Collision with bounds
                entity.onCollision(null)
            } else if (destinationSprite.solid) {
                // Collision with wall
                entity.onCollision(spriteId)
            } else {
                // Move
                const oldX = entity.pos_x
                const oldY = entity.pos_y
                entity.pos_x = newX
                entity.pos_y = newY
                entity.onMoved(oldX, oldY)
            }
        }
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

        const ts = mapManager.getSpriteId(newX + obj.size_x / 2, newY + obj.size_y / 2)
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

    entityAtXY: function (self, x, y) {
        for (let i = 0; i < gameManager.entities.length; i++) {
            const entity = gameManager.entities[i]
            if (entity !== self) {
                if (x + self.size_x < entity.pos_x ||
                    y + self.size_y < entity.pos_y ||
                    x > entity.pos_x + entity.size_x ||
                    y > entity.pos_y + entity.size_y) {
                    continue
                }
                return entity
            }
        }
        return null
    }
}
