const gameManager = {
    factory: {},
    entities: [],
    player: null,
    fireNum: 0,
    laterKill: [],

    // ЧУЖИЕ КУСКИ КОДА ДЛЯ СМЕНЫ УРОВНЕЙ
    // levels_path: ["maps/sokoban_0.json","maps/sokoban_1.json"],
    // level: 0,
    // count_target: 0,
    // players_steps: 0,

    loadAll: function () {
        soundManager.init()
        soundManager.loadArray(['music/bonus.wav', 'music/background.mp3'])
        mapManager.loadMap('map.json')
        // Или mapManager.loadMap(this.levels_path[this.level])
        spriteManager.loadAtlas('sprites/atlas.json', 'sprites/spritesheet.png')

        gameManager.factory.Player = Player // инициализация фабрики
        gameManager.factory.Bonus = Bonus
        gameManager.factory.Player = Player
        gameManager.factory.Finish = Finish
        gameManager.factory.Box = Box

        mapManager.parseEntities()
        mapManager.draw(ctx)
        eventsManager.setup()
        soundManager.play('music/background.mp3', { looping: true, volume: 0.75 })
    },

    initPlayer: function (obj) {
        this.player = obj
    },

    play: function () {
        gameManager.loadAll()
        setInterval(updateWorld, 50)
    },

    kill: function (obj) {
        this.laterKill.push(obj)
    },

    update: function () {
        if (this.player === null) return
        this.player.move_x = 0
        this.player.move_y = 0
        if (eventsManager.action.up) this.player.move_y = -1
        if (eventsManager.action.down) this.player.move_y = 1
        if (eventsManager.action.left) this.player.move_x = -1
        if (eventsManager.action.right) this.player.move_x = 1
        if (eventsManager.action.esc) this.end_game()

        // обновление информации по всем объектам на карте
        this.entities.forEach(function (e) {
            try {
                e.update()
            } catch (ex) {
                console.log(e.name + ' ' + JSON.stringify(ex))
            }
        })

        // удаление всех объектов попавших в laterKill
        for (let i = 0; i < this.laterKill.length; i++) {
            const idx = this.entities.indexOf(this.laterKill[i])
            if (idx > -1) {
                this.entities.splice(idx, 1)
            }
        }
        this.laterKill.length = 0

        mapManager.draw(ctx) // Перерисовываем карту
        mapManager.centerAt(this.player.pos_x, this.player.pos_y) // центрируем карту
        this.draw(ctx) // Перерисовываем объекты

        // if (this.check_game_status()) {
        //     if (this.level + 1 === this.levels_path.length) {
        //         this.end_game()
        //     } else { this.go_next_level() }
        // }
    },

    draw: function (ctx) {
        for (let e = 0; e < this.entities.length; e++) {
            this.entities[e].draw(ctx)
        }
    }

    // ЧУЖИЕ КУСКИ КОДА ДЛЯ СМЕНЫ УРОВНЕЙ
    // check_game_status () {
    //     let t = 0
    //     this.entities.forEach(function (e) {
    //         if (e.name.match(/box_[\d]/) && e.status) t++
    //     })

    //     if (t === this.count_target && this.count_target > 0) return true
    //     return false
    // },

    // reset_level () {
    //     this.level--
    //     this.go_next_level()
    // },

    // go_next_level: function () {
    //     clearInterval(this.interval)
    //     this.level++
    //     this.count_target = 0
    //     this.entities = []
    //     mapManager.reset()

    //     mapManager.loadMap(this.levels_path[this.level])
    //     mapManager.parseEntities()
    //     ctx.clearRect(0, 0, mapManager.view.w, mapManager.view.h)
    //     mapManager.draw(ctx)
    //     gameManager.play()
    // },

    // end_game: function () {
    //     clearInterval(this.interval)
    //     mapManager.reset()
    //     gameManager.entities = []
    //     ctx.clearRect(0, 0, mapManager.view.w, mapManager.view.h)
    //     text = 'Вы прошли ' + (this.level + 1) + ' уровня за ' + this.players_steps + ' шагов'
    //     ctx.font = '22px Verdana'
    //     ctx.fillText(text, mapManager.view.w / 4, mapManager.view.h / 2)
    //     update_records()
    // }
}

function updateWorld () {
    gameManager.update()
}
