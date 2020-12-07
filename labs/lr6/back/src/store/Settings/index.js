
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
    run() {
        clearTimeout(this.t1)
        this.listners["start"].forEach(cb => cb())
        this.started = true
    }

    onInit() {
        // debugger
        const msI = hmsToMsec(this.interval)
        const msS = hmsToMsec(this.start)
        const msE = hmsToMsec(this.end)
        this.t1 = setTimeout(() => {
            this.i1 = setInterval(() => {
                this.listners["priceUpdate"].forEach(cb => cb())
                // ws.emit("started", { started: true })

            }, msI)
            this.run()

            // ws.emit("started", { started: true })

        }, msS)
        this.t2 = setTimeout(() => {
            clearTimeout(this.t2)
            this.listners["end"].forEach(cb => cb())
            this.ended = true
            // ws.emit("ended", { ended: true })

        }, msE)
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