const gameManager = {
    canvas: document.getElementById('gameCanvas'),
    ctx: document.getElementById('gameCanvas').getContext('2d'),
    interval: null,
    factory: {},
    entities: [],
    player: null,
    fireNum: 0, // TODO
    laterKill: [], // TODO
    level: 0, // TODO
    levels: ['maps/1.json', 'maps/2.json'], // https://www.mapeditor.org/ Export -> JSON
    sounds: ['sounds/background.mp3', 'sounds/jump.wav'],
    spritesheetJson: 'sprites/sprites.json', // https://www.leshylabs.com/apps/sstool/ JSON-TP-Array
    spritesheet: 'sprites/spritesheet.png', // https://www.leshylabs.com/apps/sstool/
    keyFounded: false,

    play: function () {
        console.log("started")
        this.interval = setInterval(this.update.bind(this), 40)
    },

    pause: function () {
        console.log("pauseded")
        clearInterval(this.interval)
    },


    start: function () {
        gameManager.loadAll()
        // this.update()
        // this.interval = setTimeout(() => (setInterval(this.update.bind(this), 40)), 2000)
        // this.interval = setInterval(this.update.bind(this), 40)
        this.play()
    },

    loadAll: function () {
        gameManager.factory.Player = Player
        // gameManager.factory.Bonus = Bonus
        // gameManager.factory.Player = Player
        // gameManager.factory.Finish = Finish
        gameManager.factory.Ghost = Ghost
        gameManager.factory.PotionMP = PotionMP
        gameManager.factory.PotionHP = PotionHP
        gameManager.factory.Chest = Chest
        gameManager.factory.Waste = Waste
        // Init
        soundManager.init()
        soundManager.loadArray(this.sounds)
        mapManager.loadMap(this.levels[this.level])
        spriteManager.loadAtlas(this.spritesheetJson, this.spritesheet)
        mapManager.parseEntities()
        mapManager.draw(this.ctx)
        eventsManager.setup(this.canvas)
        // Run
        soundManager.play(this.sounds[0], { looping: true, volume: 0.75 })
    },

    update: function () {
        // console.log("upded")
        // console.log(this.player)
        if (this.player === null) return
        // Global input
        if (eventsManager.action.esc) this.end_game()
        // Entities update
        this.entities.forEach(function (entity) {
            entity.update()
        })
        // Entities destroy
        for (let i = 0; i < this.laterKill.length; i++) {
            const idx = this.entities.indexOf(this.laterKill[i])
            if (idx > -1) {
                this.entities.splice(idx, 1)
            }
        }
        this.laterKill.length = 0
        // Render
        mapManager.centerAt(this.player.pos_x, this.player.pos_y)
        // Draw background
        mapManager.draw(this.ctx)
        // Draw foreground
        for (let e = 0; e < this.entities.length; e++) {
            this.entities[e].draw(this.ctx)
        }
        // End game check
        if (this.isGameOver()) {
            if (this.level + 1 === this.levels_path.length) {
                this.endGame()
            } else {
                this.nextLevel()
            }
        }
    },

    isGameOver: function () {
        return false
        // TODO custom logic
    },

    endGame: function () {
        clearInterval(this.interval)
        mapManager.reset(this.ctx)
        gameManager.entities = []
        gameManager.player = null
        // text = 'Вы прошли ' + (this.level + 1) + ' уровня за ' + this.players_steps + ' шагов'
        // this.ctx.font = '22px Verdana'
        // this.ctx.fillText(text, mapManager.view.w / 4, mapManager.view.h / 2)
        // updateRecords() // TODO
    },

    reset_level() {
        this.level--
        this.nextLevel()
    },

    nextLevel: function () {
        // Clear
        clearInterval(this.interval)
        mapManager.reset(this.ctx)
        gameManager.entities = []
        gameManager.player = null
        // Load
        this.level++
        mapManager.loadMap(this.levels_path[this.level])
        mapManager.parseEntities()
        mapManager.draw(this.ctx)
        gameManager.play()
    },

    kill: function (obj) {
        this.laterKill.push(obj)
    }
}
