// const defaultState = require(`../../${process.env.DATA_INIT_FILE}`);
// const wsm = (new (require("../ws"))).getInstance()
const User = require('./User')
const Paper = require('./Paper')


class Store {
    constructor() {
        this.state = {
            users: [],
            papers: [],

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
    createPaper(data) {
        let paper = new Paper(data)
        this.state.papers.push(paper)
        // user && wsm.roomSend('/users/', {
        //     action: "newCard",
        //     data: { newCard: UserCard({ user: user.json() }) }
        // })
        return paper
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
    findPaper(paperID) {
        return this.state.papers.find(paper => paper.id == paperID)
    }

    userCheckAccess(userID, accessToken) {
        let user = this.state.users.find(user => user.id == userID)
        return user && user.checkAccess(accessToken) && user
    }

    getUsers() {
        return this.state.users.map(user => user.json())
    }
    getPapers() {
        return this.state.papers.map(paper => paper.json())
    }
    json() {
        return {
            users: this.getUsers(),
            papers: this.getPapers(),

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
            this.startState.paper && this.startState.paper.forEach(SingletonStore.instance.createPaper)
        }
    }

    getInstance() {
        return SingletonStore.instance;
    }
}

module.exports = SingletonStore;
