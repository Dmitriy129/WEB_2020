
// const wsm = (new (require("../ws"))).getInstance()

// const userCounter = require("../api/Counter")("user")

// const ws = require("../../socket")
const ws = (new (require("../../socket"))).api();
// const ws = req


module.exports = class User {
    constructor({ id, login, name, img, accessToken, balance, role }) {
        // this.id = userCounter.next()
        this.id = id
        this.login = login
        this.name = name ? name.split(" ")[0] : login
        this.surname = name ? name.split(" ")[1] : login
        this.img = img
        this.accessToken = accessToken
        // this.pictures = []
        this.balance = balance || 10000001
        this.papers = {}
        this.confirmed = false
        this.role = role || "user"
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
        if (paper.availableCount() >= count) {
            if (this.canPay(finalPrice)) {
                if (!this.papers[paper.id] || !paper.owners[this.id]) {
                    this.papers[paper.id] = { paper: paper, count: 0 }
                    paper.owners[this.id] = { user: this, count: 0 }
                }
                const nowCout = this.papers[paper.id].count
                const newCout = nowCout ? nowCout + parseInt(count) : parseInt(count)
                this.changeBalance(this.balance - finalPrice)
                this.papers[paper.id].count = newCout
                paper.owners[this.id].count = newCout
            }
            else this.ws?.emit("notEnoughMoney")
        }
        else this.ws?.emit("notEnoughPapers")

    }
    sellPaper(paper, count) {
        if (!this.papers[paper.id]) return
        const finalPrice = paper.price * count
        const nowCout = this.papers[paper.id].count
        const newCout = nowCout - parseInt(count)
        if (nowCout && nowCout >= count) {
            this.changeBalance(this.balance + finalPrice)
            this.papers[paper.id].count = newCout
            paper.owners[this.id].count = newCout
        }
        else this.ws?.emit("notEnoughPapers")
    }

    changeBalance(newBalance) {
        this.balance = parseInt(newBalance)
        console.log("balance changed", this.login, this.balance)
        this.ws?.emit("balanceChanged", { balance: this.balance })
        // ws.emit("balanceChanged", { balance: this.balance })
        // debugger
        // this.checkBalanceInPaper()
        // wsm.currWsSend({
        //     action: "balanceUpdated",
        //     data: { newBalance }
        // }, this.ws)
        return true
    }

    checkBalanceInPaper() {
        this.balanceInPaper = Object.values(this.papers).reduce((a, { paper: { price }, count }) => a + price * count, 0)
        // ws.emit("balanceInPaperChanged", { balanceInPaper: this.balanceInPaper })
        return this.balanceInPaper
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


    shortJson() {
        return {
            id: this.id,
            login: this.login,
            name: this.name,
            surname: this.surname,
            accessToken: this.accessToken,
            balance: this.balance,
            balanceInPaper: this.checkBalanceInPaper(),
            img: this.img,
            // papers: this.papers.map(e => ({})),
            confirmed: this.confirmed,
            role: this.role,
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
            balanceInPaper: this.checkBalanceInPaper(),
            img: this.img,
            papers: Object.values(this.papers).map(({ paper, count }) => ({ paper: paper.json(), count })),
            confirmed: this.confirmed,
            role: this.role,
        }
    }


}

