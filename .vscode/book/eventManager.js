const eventsManager = {
    bind: [], // сопоставление клавишам
    action: [], // действия

    setup: function (canvas) { // настройка сопоставлений
        this.bind[27] = 'esc'
        this.bind[87] = 'up' // w - двигаться наверх
        this.bind[65] = 'left' // a - двигаться влево
        this.bind[83] = 'down' // s - двигаться вниз
        this.bind[68] = 'right' // d - двигаться вправо
        this.bind[32] = 'fire' // пробел - выстрелить
        // контроль событий мыши
        canvas.addEventListener('mousedown', this.onMouseDown)
        canvas.addEventListener('mouseup', this.onMouseUp)
        document.body.addEventListener('keydown', this.onKeyDown)
        document.body.addEventListener('keyup', this.onKeyUp)
    },

    onMouseDown: function (event) { // нажали мышь
        eventsManager.action.fire = true
    },

    onMouseUp: function (event) { // отжали мышь
        eventsManager.action.fire = false
    },

    onKeyDown: function (event) { // нажали на кнопку
        // проверили, есть ли сопоставление действию для события с кодом keyCode
        const action = eventsManager.bind[event.keyCode]
        if (action) { // проверка на action === true
            eventsManager.action[action] = true // согласились
            // выполнить действие
        }
    },

    onKeyUp: function (event) { // отпустили кнопку на клавиатуре
    // проверили, есть ли сопоставление действию для события с кодом keyCode
        const action = eventsManager.bind[event.keyCode]
        if (action) { // проверка на action === true
            eventsManager.action[action] = false // отменили
            // выполнить действие
        }
    }
}
