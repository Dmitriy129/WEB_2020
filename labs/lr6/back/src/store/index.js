const defaultState = require('./defaultState.json');
// const wsm = (new (require("../ws"))).getInstance()
const User = require('./User')
const Paper = require('./Paper')
const Settings = require('./Settings');

const ws = (new (require("../socket"))).api();

class Store {
    constructor() {
        // this.settings
        this.state = {
            users: [],
            papers: [],
        }
        this.createUser = this.createUser.bind(this)
        this.createPaper = this.createPaper.bind(this)
        this.createSettings = this.createSettings.bind(this)
    }

    onInit() {
        // debugger
        this.settings.addEventListner("start", () => console.log("started"))
        this.settings.addEventListner("end", () => console.log("ended"))
        this.settings.addEventListner("priceUpdate", () => console.log("priceUpdate"))
        this.settings.addEventListner("priceUpdate", () => this.state.papers.forEach(paper => paper.updatePrice()))
        this.settings.addEventListner("priceUpdate", () => this.state.users.forEach(user => user.checkBalanceInPaper()))


        this.settings.addEventListner("start", () => ws.emit("started"))
        this.settings.addEventListner("end", () => ws.emit("ended"))
        this.settings.addEventListner("priceUpdate", () => ws.emit("priceUpdated"))

    }
    getStore() {
        return this.state;
    }
    createSettings(data) {

        this.settings = new Settings(data)
        return this.settings
    }
    createUser(data) {
        let user = new User(data)
        this.state.users.push(user)
        return user
    }
    createPaper(data) {
        let paper = new Paper(data)
        this.state.papers.push(paper)
        return paper
    }
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
    connectWsToUser(ws, id) {
        this.findUser(id).ws = ws
    }
    findUserByWs(ws) {
        return this.state.users.find(user => user.ws == ws)
    }
    tryBuyPaper(userID, paperID, count) {
        const paper = this.findPaper(paperID)
        const user = this.findUser(userID)
        if (paper && user) user.buyPaper(paper, parseInt(count))
    }
    trySellPaper(userID, paperID, count) {
        const paper = this.findPaper(paperID)
        const user = this.findUser(userID)
        if (paper && user) user.sellPaper(paper, parseInt(count))
    }
    addPapers(paperID, count) {
        const paper = this.findPaper(paperID)
        if (paper) paper.add(parseInt(count))
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
            this.startState?.users?.forEach(SingletonStore.instance.createUser)
            this.startState?.papers?.forEach(SingletonStore.instance.createPaper)
            SingletonStore.instance.createSettings(this.startState?.settings)
            SingletonStore.instance.onInit()
        }
    }

    getInstance() {
        return SingletonStore.instance;
    }
}

const _store = new SingletonStore()
_store.initState()

module.exports = SingletonStore;
