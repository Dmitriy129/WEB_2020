
const { hmsToMsec } = require('../../api')
const ws = (new (require("../../socket"))).api();

module.exports = class Settings {
    constructor({ start, end, interval }) {
        // debugger
        this.start = start
        this.end = end
        this.interval = interval
        this.started = false
        this.ended = false
        this.listners = {
            priceUpdate: [],
            start: [],
            end: [],
        }
        this.onInit()
    }

    addEventListner(eventID, cb) {
        this.listners[eventID].push(cb)
    }

    onInit() {
        // debugger
        const ms = hmsToMsec(this.interval)
        this.t1 = setTimeout(() => {
            clearTimeout(this.t1)
            this.i1 = setInterval(() => {
                this.listners["priceUpdate"].forEach(cb => cb())
                // ws.emit("started", { started: true })

            }, ms)
            this.listners["start"].forEach(cb => cb())
            this.started = true

            // ws.emit("started", { started: true })

        }, ms)
        this.t2 = setTimeout(() => {
            clearTimeout(this.t2)
            this.listners["end"].forEach(cb => cb())
            this.ended = true
            // ws.emit("ended", { ended: true })

        }, ms)
    }

    json() {
        return ({
            start: this.start,
            end: this.end,
            interval: this.interval,
            started: this.started,
            ended: this.ended,
        })
    }


}