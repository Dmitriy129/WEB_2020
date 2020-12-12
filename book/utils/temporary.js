function renderPlayer (me, player) {
    const { x, y, direction, username, score } = player
    const canvasX = canvas.width / 2 + x - me.x
    const canvasY = canvas.height / 2 + y - me.y
    // Draw ship
    context.save()
    context.translate(canvasX, canvasY)
    context.rotate(direction)
    context.drawImage(
        player.charging ? assets.getAsset('ship_charge.png') : assets.getAsset('ship.png'),
        -player.radius,
        -player.radius,
        player.radius * 2,
        player.radius * 2
    )
    context.restore()
    // Draw health bar
    context.fillStyle = 'red'
    context.fillRect(
        canvasX - player.radius,
        canvasY + player.radius + 8,
        player.radius * 2,
        4
    )
    context.fillStyle = 'lime'
    context.fillRect(
        canvasX - player.radius,
        canvasY + player.radius + 8,
        player.radius * 2 * (player.hp / PLAYER_MAX_HP),
        4
    )
    // Draw stamina bar
    context.fillStyle = 'yellow'
    context.fillRect(
        canvasX - player.radius,
        canvasY + player.radius + 12,
        player.radius * 2,
        4
    )
    context.fillStyle = 'black'
    context.fillRect(
        canvasX - player.radius + player.radius * 2 * player.chargeCooldown / PLAYER_CHANGE_MAX,
        canvasY + player.radius + 12,
        player.radius * 2 * (1 - player.chargeCooldown / PLAYER_CHANGE_MAX),
        4
    )
    // Draw name
    const name = (player.spectator ? 'Spectator ' : '') + (username || 'Looper')
    const fontSize = Math.max(player.radius / 2, 12)
    context.lineWidth = 3
    context.fillStyle = '#eeeeee'
    context.strokeStyle = '#000000'
    context.miterLimit = 1
    context.lineJoin = 'round'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.font = 'bold ' + fontSize + 'px sans-serif'

    context.strokeText(name, canvasX, canvasY - player.radius * 1.5)
    context.fillText(name, canvasX, canvasY - player.radius * 1.5)
    context.strokeText(score, canvasX, canvasY - player.radius * 2)
    context.fillText(score, canvasX, canvasY - player.radius * 2)

    // if (global.toggleMassState === 0) {
    //     context.strokeText(name, circle.x, circle.y)
    //     context.fillText(name, circle.x, circle.y)
    // } else {
    //     context.strokeText(name, circle.x, circle.y)
    //     context.fillText(name, circle.x, circle.y)
    //     context.font = 'bold ' + Math.max(fontSize / 3 * 2, 10) + 'px sans-serif'
    //     if (name.length === 0) fontSize = 0
    //     context.strokeText(Math.round(cellCurrent.mass), circle.x, circle.y + fontSize)
    //     context.fillText(Math.round(cellCurrent.mass), circle.x, circle.y + fontSize)
    // }
}
