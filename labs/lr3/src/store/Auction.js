
const wsm = (new (require("../ws"))).getInstance()
const auctionCounter = require("../api/Counter")("auction")
const { runAtDate } = require('../api')

module.exports = class Auction {
    constructor({ picture, timeStart, date, time, costStart, rateMultiplier, timeInterval, owner }) {
        this.id = auctionCounter.next()
        this.picture = picture
        picture.auction = this
        this.timeStart = timeStart || new Date(date + ' ' + time)
        this.costStart = costStart
        this.rateMultiplier = rateMultiplier
        this.timeInterval = timeInterval
        this.costNow = this.costStart
        this.users = []

        this.finished = false

        this.reservedMoney = 0;
        this.owner = owner;
        this.history = [{ user: owner, msg: "Выставил на анкцион", time: new Date().toLocaleTimeString() }]
        if (new Date() > this.timeStart) this.access = true;
        else {
            this.access = false;
            runAtDate(() => {
                this.access = true;
                wsm.roomSend("/auctions/", {
                    action: "accessUpdated",
                    data: {
                        id: this.id,
                        access: this.access
                    }
                })
            }, this.timeStart - new Date(),
                this._t)
        }
    }

    updateInfo({ date, time, costStart, rateMultiplier, timeInterval }) {
        this.timeStart = new Date(date + ' ' + time)
        if (new Date() > this.timeStart) this.access = true
        else {
            this.access = false;
            wsm.roomSend("/auctions/", {
                action: "accessUpdated",
                data: {
                    id: this.id,
                    access: this.access,
                    timeStart: this.timeStart
                }
            })
        }
        clearTimeout(this._t)
        runAtDate(() => {
            this.access = true;
            wsm.roomSend("/auctions/", {
                action: "accessUpdated",
                data: {
                    id: this.id,
                    access: this.access
                }
            })
        }, this.timeStart - new Date(),
            this._t)
        this.costStart = costStart || this.costStart
        this.rateMultiplier = rateMultiplier || this.rateMultiplier
        this.timeInterval = timeInterval || this.timeInterval

    }


    checkAccess(user) {
        return this.owner === user || this.access
    }

    start() {
        this.access = true
    }
    end() {
        this.access = false
        this.finished = true
        this.picture.user.sellPicture(this.picture, this.reservedMoney)
        this.user && this.user.takePicture(this.picture)
        this.users.length = 0
        this.picture.cost = this.reservedMoney;
        this.picture.auction = {};
        this.reservedMoney = 0;
        wsm.roomSend(`/auction/${this.id}`, {
            action: "auctionFinished"
        })
        this.history.push({ user: this.user, msg: `Купил картину за: ${this.costNow}`, time: new Date().toLocaleTimeString() })
    }

    setTimer() {
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            clearTimeout(this.timer)
            this.end()
            // console.log("timer...")
        }, this.timeInterval * 1000)
    }

    rateIncrease(user) {
        this.lastBetTime = new Date()
        if (!this.access) return this.access
        if (!user.reserveMoney(this.costNow)) return false
        this.user && this.user.changeBalance(this.user.balance += parseFloat(this.reservedMoney))
        this.user = user
        this.reservedMoney = this.costNow
        this.costNow *= this.rateMultiplier
        this.setTimer()

        wsm.roomSend(`/auction/${this.id}`, {
            action: "newBet",
            data: {
                costNow: this.costNow,
                costNext: this.costNow * this.rateMultiplier,
                userID: this.user.id,
                timer: this.timeInterval
            }
        })
        this.history.push({ user: this.user, msg: `Делает ставку: ${this.costNow}`, time: new Date().toLocaleTimeString() })

        return true
    }

    userJoin(user) {
        wsm.join(`/auction/${this.id}`)
        return this.checkAccess && this.users.push(user)
    }

    userLeave(user) {
        wsm.leave(`/auction/${this.id}`)
        this.users = this.users.filter(e_user => e_user !== user)
        return true
    }

    isOwner(user) {
        return user && this.owner.id === user.id
    }

    canBeDeleted() {
        return this.finished && this.access
    }

    getHistoryShort() {
        return this.history.map(e => ({ ...e, user: e.user.jsonShort() }))
    }

    json() {
        return {
            id: this.id,
            picture: this.picture.jsonShort(),
            timeStart: this.timeStart,
            costStart: this.costStart,
            rateMultiplier: this.rateMultiplier,
            timeInterval: this.timeInterval,
            costNow: this.costNow,
            users: this.users.map(user => user.jsonShort()),
            reservedMoney: this.reservedMoney,
            access: this.access,
            finished: this.finished,
            user: this.user && this.user.jsonShort(),
            owner: this.owner.jsonShort(),
        }
    }

}


