
const { hmsToMsec } = require('../../api')

export default class Settings {
    constructor({ start, end, interval }) {
        this.start = start
        this.end = end
        this.interval = interval
        this.listners = {
            priceUpdate: [],
            start: [],
            end: [],
        }
        onInit()
    }

    addEventListner(eventID, cb) {
        this.listners[eventID].push(cb)
    }

    onInit() {
        const ms = hmsToMsec(this.interval)
        this.i1 = setInterval(() => {
            this.listners["priceUpdate"].forEach(cb => cb())
        }, ms)
        this.t1 = setTimeout(() => {
            clearTimeout(t1)
            this.listners["start"].forEach(cb => cb())
        }, ms)
        this.t2 = setTimeout(() => {
            clearTimeout(t2)
            this.listners["end"].forEach(cb => cb())
        }, ms)
    }



}