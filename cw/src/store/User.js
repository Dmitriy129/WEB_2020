
const wsm = (new (require("../ws"))).getInstance()

module.exports = class User {
    constructor({ id, login, name, img, accessToken }) {
        this.id = id
        this.login = login
        this.name = name ? name.split(" ")[0] : login
        this.surname = name ? name.split(" ")[1] : login
        this.img = img
        this.accessToken = accessToken
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

    connectWs(ws) {
        this.ws = ws
    }


    json() {
        return {
            id: this.id,
            login: this.login,
            name: this.name,
            surname: this.surname,
            accessToken: this.accessToken,
            img: this.img,
        }
    }


}

