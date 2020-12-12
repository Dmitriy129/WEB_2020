const eventsManager = {
    bind: [],
    action: [],

    setup: function (canvas) {
        this.bind[27] = 'esc' 
        this.bind[87] = 'up' 
        this.bind[65] = 'left' 
        this.bind[83] = 'down' 
        this.bind[68] = 'right' 
        this.bind[16] = 'nitro' 
        this.bind[18] = 'slow' 
        canvas.addEventListener('mousedown', this.onMouseDown)
        canvas.addEventListener('mouseup', this.onMouseUp)
        canvas.addEventListener('mousemove', this.onMouseMove)
        document.body.addEventListener('keydown', this.onKeyDown)
        document.body.addEventListener('keyup', this.onKeyUp)
    },

    onMouseMove: function (event) {
        eventsManager.action.fire && (eventsManager.action.fire = event)
    },

    onMouseDown: function (event) {
        eventsManager.action.fire = event
    },

    onMouseUp: function (event) {
        eventsManager.action.fire = false
    },

    onKeyDown: function (event) {
        const action = eventsManager.bind[event.keyCode]
        if (action) {
            event.preventDefault ? event.preventDefault(): event.returnValue=false
            eventsManager.action[action] = true
        }
    },

    onKeyUp: function (event) {
        const action = eventsManager.bind[event.keyCode]
        if (action) {
            event.preventDefault ? event.preventDefault(): event.returnValue=false
            eventsManager.action[action] = false
        }
    }
}
