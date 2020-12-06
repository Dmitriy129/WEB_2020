
// const wsm = (new (require("../ws"))).getInstance()

// const userCounter = require("../api/Counter")("user")

// const ws = require("../../socket")
const ws = (new (require("../../socket"))).getInstance();


module.exports = class User {
    constructor({ id, login, name, img, accessToken, balance }) {
        // this.id = userCounter.next()
        this.id = id
        this.login = login
        this.name = name ? name.split(" ")[0] : login
        this.surname = name ? name.split(" ")[1] : login
        this.img = img
        this.accessToken = accessToken
        // this.pictures = []
        this.balance = balance || 1234567890
        this.papers = {}
        this.confirmed = false
    }
    updateInfo({ id, login, name, img, accessToken, balance }) {
        id && (this.id = id)
        login && (this.login = login)
        name && (this.name = name.split(" ")[0])
        name && (this.surname = name.split(" ")[1])
        img && (this.img = img)
        accessToken && (this.accessToken = accessToken)
        balance && (this.balance = balance)
    }

    canPay(cost) {
        return this.balance >= cost
    }

    buyPaper(paper, count) {
        const finalPrice = paper.price * count
        const nowCout = this.papers[paper.name]
        const newCout = nowCout ? nowCout + count : count
        if (paper.availableCount() >= count && this.canPay(finalPrice)) {
            this.changeBalance(this.balance - finalPrice)
            this.papers[paper.id] = newCout
            paper.owners[this.id] = newCout
        }
    }
    sellPaper(paper, count) {
        const finalPrice = paper.price * count
        const nowCout = this.papers[paper.id]
        const newCout = nowCout - count
        if (nowCout && nowCout >= count) {
            this.changeBalance(this.balance + finalPrice)
            this.papers[paper.id] = newCout
            paper.owners[this.id] = newCout
        }
    }

    changeBalance(newBalance) {
        this.balance = newBalance
        console.log("balance changed", this.login, this.balance)
        debugger
        ws.emit("balanceChanged", { balance: this.balance })
        // wsm.currWsSend({
        //     action: "balanceUpdated",
        //     data: { newBalance }
        // }, this.ws)
        return true
    }


    signin(accessToken) {
        this.accessToken = accessToken
    }

    signout() {
        this.accessToken = undefined
    }

    checkAccess(accessToken) {
        return this.accessToken === accessToken
    }

    confirm() {
        this.confirmed = true
    }


    me() {   // for NavBar
        return {
            id: this.id,
            name: this.name,
            surname: this.surname,
            balance: this.balance,
            // picturesQ: this.pictures.length
        }
    }


    json() {
        return {
            id: this.id,
            login: this.login,
            name: this.name,
            surname: this.surname,
            accessToken: this.accessToken,
            balance: this.balance,
            img: this.img,
            papers: this.papers,
            confirmed: this.confirmed,
        }
    }


}

