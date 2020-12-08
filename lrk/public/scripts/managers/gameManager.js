const gameManager = {
    canvas: document.getElementById('gameCanvas'),
    ctx: document.getElementById('gameCanvas').getContext('2d'),
    interval: null,
    factory: {},
    entities: [],
    player: null,
    fireNum: 0, // TODO
    forRemove: [], // TODO
    level: 0, // TODO
    levels: ['maps/1.json', 'maps/2.json'], // https://www.mapeditor.org/ Export -> JSON
    sounds: {
        background: [
            "/sounds/background.mp3",
            "/sounds/background_1.mp3",
            "/sounds/background_2.wav",
            "/sounds/background_3.wav",
            "/sounds/background_main.mp3",
        ],
        bomb: [
            "/sounds/bomb_1.wav",
            "/sounds/bomb_2.wav",
        ],
        arrow: [
            "/sounds/arrow_1.wav",
        ],
        fire: [
            "/sounds/fire_loop_1.wav",
            "/sounds/fire_2.mp3",
        ],
        goblin: [
            "/sounds/goblin_1.wav",
        ],
        win: [
            "/sounds/win_1.wav",
        ],
        loose: [
            "/sounds/loose_1.wav",
            "/sounds/loose_2.wav",
            "/sounds/loose_3.wav",
        ],
        damage: [
            "/sounds/damageGhost_1.wav",
            "/sounds/damageMe_1.wav",
            "/sounds/damageMe_2.wav",
            "/sounds/damageSkeleton_1.mp3",
            "/sounds/damageSkeleton_2.wav",
        ],
        achievement: [
            "/sounds/lvlup_1.wav",
            "/sounds/lvlup_2.wav",
        ],
        money: [
            "/sounds/money_1.wav",
            "/sounds/money_2.wav",
        ],
        potion: [
            "/sounds/potionHP_1.wav",
            "/sounds/potionMP_1.wav",
            "/sounds/potionMP_2.wav",
        ],
    },
    // sounds: ["/sounds/arrow_1.wav", "/sounds/background.mp3", "/sounds/background_1.mp3", "/sounds/background_2.wav", "/sounds/background_3.wav", "/sounds/background_main.mp3", "/sounds/bomb_1.wav", "/sounds/bomb_2.wav", "/sounds/damageGhost_1.wav", "/sounds/damageMe_1.wav", "/sounds/damageMe_2.wav", "/sounds/damageSkeleton_1.mp3", "/sounds/damageSkeleton_2.wav", "/sounds/fire_loop_1.wav", "/sounds/goblin_1.wav", "/sounds/jump.wav", "/sounds/loose_1.wav", "/sounds/loose_2.wav", "/sounds/loose_3.wav", "/sounds/lvlup_1.wav", "/sounds/lvlup_2.wav", "/sounds/money_1.wav", "/sounds/money_2.wav", "/sounds/potionHP_1.wav", "/sounds/potionMP_1.wav", "/sounds/potionMP_2.wav", "/sounds/win_1.wav",],
    spritesheetJson: 'sprites/sprites.json', // https://www.leshylabs.com/apps/sstool/ JSON-TP-Array
    spritesheet: 'sprites/spritesheet.png', // https://www.leshylabs.com/apps/sstool/

    play: function () {
        // alert("Псс, теперь не стрелы, а бомбочки( не важно, что похожи на грибы), можно подорваться")
        gameManager.loadAll()
        this.interval = setInterval(this.update.bind(this), 40)
    },

    loadAll: function () {
        gameManager.factory.Player = Player
        gameManager.factory.Finish = Finish
        // gameManager.factory.Bonus = Bonus
        // gameManager.factory.Player = Player
        // gameManager.factory.Finish = Finish
        gameManager.factory.Bombs = Bombs
        gameManager.factory.Arrow = Arrow
        gameManager.factory.Money = Money
        gameManager.factory.Key = Key
        gameManager.factory.Ghost = Ghost
        gameManager.factory.Skeleton = Skeleton
        gameManager.factory.PotionMP = PotionMP
        gameManager.factory.PotionHP = PotionHP
        gameManager.factory.Chest = Chest
        gameManager.factory.Waste = Waste
        // Init
        mapManager.init(this.canvas)
        soundManager.init()
        HTMLManager.init()
        soundManager.loadAll(this.sounds)
        mapManager.loadMap(this.levels[this.level])
        spriteManager.loadAtlas(this.spritesheetJson, this.spritesheet)
        mapManager.parseEntities()
        mapManager.draw(this.ctx)
        eventsManager.setup(this.canvas)
        // BarManager.init()
        // Run
        soundManager.play(this.sounds.background[4], { looping: true, volume: 0.75 })
        // mapManager.loadMap(this.levels[1])

    },

    update: function () {
        if (this.player === null) return
        HTMLManager.updateAll()
        // Global input
        if (eventsManager.action.esc) this.end_game()
        // Entities update
        this.entities.forEach(function (entity) {
            entity.update()
        })
        // Entities destroy
        for (let i = 0; i < this.forRemove.length; i++) {
            const idx = this.entities.indexOf(this.forRemove[i])
            if (idx > -1) {
                this.entities.splice(idx, 1)
            }
        }
        this.forRemove.length = 0
        // Render
        mapManager.centerAt(this.player?.pos_x || 0, this.player?.pos_y || 0)
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
                // this.nextLevel()
            }
        }
        BarManager.updateAll(this.ctx)
    },

    isGameOver: function () {
        return false
        // TODO custom logic
    },

    endGame: function () {
        if (gameManager.player) {
            let userName = prompt("Хотите сохранить результат в таблице?\nПод каким именем?", "Примите курсач, пожалуйста")
            if (userName) {
                if (userName === "Примите курсач, пожалуйста") alert("Спасибо")
                recordManager.add(userName, gameManager.player.money)
            }
            else {
                alert("Ну как хочешь, а я бы сохрнали")
            }
        }
        if (confirm("Посмотреть на таблицу результатов?")) window.location = "records"
        else window.location.reload()
        clearInterval(this.interval)
        //   alert("Вы прошли игру")
    },
    playerStatsHTMLUpdate: () => {
        const { hp, mp, haveKey, score } = this.player
    },

    nextLevel: function () {
        // Clear
        clearInterval(this.interval)
        gameManager.entities = []
        // gameManager.player = null
        mapManager.reset(this.ctx)
        this.level++
        if (this.levels[this.level]) {
            gameManager.play()
            soundManager.play(gameManager.sounds.achievement[0], { volume: 0.5 })
        }
        else {
            soundManager.play(gameManager.sounds.win[0], { volume: 0.5 })
            alert("Поздравляю, ты победил")
            this.endGame()
        }

    },


    reset_level: function () {
        this.level--
        this.nextLevel()
    },

    genObj: function (e) {
        const obj = Object.create(this.factory[e.type])
        obj.gid = e.gid
        obj.name = e.name
        obj.pos_x = Math.floor(e.x)
        obj.pos_y = Math.floor(e.y - e.height)
        obj.size_x = e.width
        obj.size_y = e.height
        this.entities.push(obj)
        return obj
    },

    remove: function (obj) {
        this.forRemove.push(obj)
    }
}
