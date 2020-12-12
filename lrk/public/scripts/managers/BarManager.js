const BarManager = {

    drawStat: function (ctx, sprite, { count = 1, x: x0 = 4, y: y0 = 4, padding = 8 }) {
        for (let i = 0; i < count; i++) {
            const x = mapManager.view.x + x0 + padding * i
            const y = mapManager.view.y + y0
            spriteManager.drawSprite(ctx, sprite, x, y)
        }
    },
    updateMoney: function (ctx) {
        const sprite = spriteManager.getSpriteBySpriteId(76)
        const count = gameManager.player?.money
        this.drawStat(ctx, sprite, { count })
    },
    updateHP: function (ctx) {
        const sprite = spriteManager.getSpriteBySpriteId(87)
        const count = gameManager.player?.hp
        this.drawStat(ctx, sprite, { count, y: 16 })
    },
    updateMP: function (ctx) {
        const sprite = spriteManager.getSpriteBySpriteId(77)
        const count = gameManager.player?.mp / 20
        this.drawStat(ctx, sprite, { count, y: 28 })
    },
    updateKey: function (ctx) {
        const sprite = spriteManager.getSpriteBySpriteId(88)
        const key = gameManager.player?.haveKey
        key && this.drawStat(ctx, sprite, { y: 48 })
    },
    updateAll: function (ctx) {
        this.updateMoney(ctx)
        this.updateHP(ctx)
        this.updateMP(ctx)
        this.updateKey(ctx)
    }
}
