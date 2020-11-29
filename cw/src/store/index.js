const wsm = (new (require("../ws"))).getInstance()
const User = require('./User')
class Store {
  constructor() {
    this.state = {
      users: [],
    }
    this.createUser = this.createUser.bind(this)

    // wsm.addListner((res, ws) => res.action === "connectUser" && this.userConnectWs(res.userID, ws))
    // wsm.addListner((res, ws) => res.action === "join" && /\/auction\/[0-9]*/.test(res.room) && this.userJoinAuction(this.userByWs(ws).id, res.room.match(/\/auction\/([0-9]*)/)[1]))
    // wsm.addListner((res, ws) => res.action === "leave" && /\/auction\/[0-9]*/.test(res.room) && this.userleaveAuction(this.userByWs(ws).id, res.room.match(/\/auction\/([0-9]*)/)[1]))
  }
  getStore() {
    return this.state;
  }

  createUser(data) {
    let user = new User(data)
    this.state.users.push(user)
    user && wsm.roomSend('/users/', {
      action: "newCard",
      data: { newCard: UserCard({ user: user.json() }) }
    })
    return user
  }
 
  // userJoinAuction(userID, auctionID) {
  //   let user = this.state.users.find(user => user.id == userID)
  //   let auction = this.state.auctions.find(auction => auction.id == auctionID)
  //   return user
  //     && auction
  //     && user.joinAuction(auction)
  //     && wsm.roomSend(`/auction/${auction.id}`, {
  //       action: "observerJoin",
  //       data: { userID: user.id }
  //       // data: { newCard: UserCard({ user: user.json() }) }
  //     })
  // }

  // userleaveAuction(userID, auctionID) {
  //   let user = this.state.users.find(user => user.id == userID)
  //   let auction = this.state.auctions.find(auction => auction.id == auctionID)
  //   return user
  //     && auction
  //     && user.leaveAuction(auction)
  //     && wsm.roomSend(`/auction/${auction.id}`, {
  //       action: "observerLeave",
  //       data: { userID: user.id }
  //       // data: { newCard: UserCard({ user: user.json() }) }
  //     })
  // }
  userConnectWs(userID, ws) {
    let user = this.state.users.find(user => user.id == userID)
    user && ws && user.connectWs(ws)
  }
  userByWs(ws) {
    return ws
      ? this.state.users.find(user => user.ws == ws) || {}
      : {}
  }
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
  getPictures() {
    return this.state.pictures.map(picture => picture.json())
  }
  getAuctions() {
    return this.state.auctions.map(auction => auction.json())
  }
  

  json() {
    return {
      users: this.getUsers(),
    }
  }
}
class SingletonStore {
  constructor() {
    if (!SingletonStore.instance) SingletonStore.instance = new Store();
  }
 
  getInstance() {
    return SingletonStore.instance;
  }
}

module.exports = SingletonStore;
