
// const wsm = (new (require("../ws"))).getInstance()

// const userCounter = require("../api/Counter")("user")

module.exports = class User {
    constructor({ id, login, name, img, accessToken }) {
        // this.id = userCounter.next()
        this.id = id
        this.login = login
        this.name = name ? name.split(" ")[0] : login
        this.surname = name ? name.split(" ")[1] : login
        this.img = img
        this.accessToken = accessToken
        // this.pictures = []
        this.balance = 1234567890
    }
    canPay(cost) {
        return this.balance >= cost
    }

    changeBalance(newBalance) {
        this.balance = newBalance
        wsm.currWsSend({
            action: "balanceUpdated",
            data: { newBalance }
        }, this.ws)
        return true
    }
    // picturesUpdated() {
    //     wsm.currWsSend({
    //         action: "picturesQUpdated",
    //         data: { picturesQ: this.pictures.length }
    //     }, this.ws)
    // }

    reserveMoney(cost) {
        return this.canPay(cost) && this.changeBalance(this.balance - parseFloat(cost))
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

    // connectWs(ws) {
    //     this.ws = ws
    // }


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
            // pictures: this.pictures.map(picture => picture.json()),
            balance: this.balance,
            img: this.img,
        }
    }
    jsonShort() {
        return {
            id: this.id,
            login: this.login,
            name: this.name,
            surname: this.surname,
            // pictures: new Array(this.pictures.length),
            balance: this.balance,
            img: this.img,
        }
    }

}

