// const defaultState = require(`../../${process.env.DATA_INIT_FILE}`);
// const wsm = (new (require("../ws"))).getInstance()
const User = require('./User')


class Store {
    constructor() {
        this.state = {
            users: [],

        }
        this.createUser = this.createUser.bind(this)
    }
    getStore() {
        return this.state;
    }

    createUser(data) {
        let user = new User(data)
        this.state.users.push(user)
        // user && wsm.roomSend('/users/', {
        //     action: "newCard",
        //     data: { newCard: UserCard({ user: user.json() }) }
        // })
        return user
    }

    // userConnectWs(userID, ws) {
    //     let user = this.state.users.find(user => user.id == userID)
    //     user && ws && user.connectWs(ws)
    // }
    // userByWs(ws) {
    //     return ws
    //         ? this.state.users.find(user => user.ws == ws) || {}
    //         : {}
    // }
    findUser(userID) {
        return this.state.users.find(user => user.id == userID)
    }

    userCheckAccess(userID, accessToken) {
        let user = this.state.users.find(user => user.id == userID)
        return user && user.checkAccess(accessToken) && user
    }

    getUsers() {
        return this.state.users.map(user => user.json())
    }
    json() {
        return {
            users: this.getUsers(),
            pictures: this.getPictures(),
            auctions: this.getAuctions()
        }
    }
}
class SingletonStore {
    constructor() {
        if (!SingletonStore.instance) SingletonStore.instance = new Store();
    }
    initState(startState) {

        this.startState = startState || defaultState
        if (this.startState) {
            this.startState.users && this.startState.users.forEach(SingletonStore.instance.createUser)
        }
    }

    getInstance() {
        return SingletonStore.instance;
    }
}

module.exports = SingletonStore;
