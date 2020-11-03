const defaultState = require(`../../${process.env.DATA_INIT_FILE}`);
const wsm = (new (require("../ws"))).getInstance()
const User = require('./User')
const Picture = require('./Picture')
const Auction = require('./Auction')
const fs = require("fs");
const pug = require('pug');
const { use } = require("../routes/auth");
const AuctionCard = pug.compileFile(process.env.DEFAULT_PUG_PATH + 'includes/AuctionCard.pug');
const PictureCard = pug.compileFile(process.env.DEFAULT_PUG_PATH + 'includes/PictureCard.pug');
const UserCard = pug.compileFile(process.env.DEFAULT_PUG_PATH + 'includes/UserCard.pug');


class Store {
  constructor() {
    this.state = {
      users: [],
      pictures: [],
      auctions: []
    }
    this.createUser = this.createUser.bind(this)
    this.createPicture = this.createPicture.bind(this)
    this.createAuction = this.createAuction.bind(this)

    wsm.addListner((res, ws) => res.action === "connectUser" && this.userConnectWs(res.userID, ws))
    wsm.addListner((res, ws) => res.action === "join" && /\/auction\/[0-9]*/.test(res.room) && this.userJoinAuction(this.userByWs(ws).id, res.room.match(/\/auction\/([0-9]*)/)[1]))
    wsm.addListner((res, ws) => res.action === "leave" && /\/auction\/[0-9]*/.test(res.room) && this.userleaveAuction(this.userByWs(ws).id, res.room.match(/\/auction\/([0-9]*)/)[1]))
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
  createPicture(data) {
    let picture = new Picture(data)
    this.state.pictures.push(picture)
    picture && wsm.roomSend('/pictures/', {
      action: "newCard",
      data: { newCard: PictureCard({ picture: picture.json() }) }
    })
    return picture
  }
  createAuction(data) {
    let auction = new Auction(data)
    this.state.auctions.push(auction)
    auction && wsm.roomSend('/auctions/', {
      action: "newCard",
      data: { newCard: AuctionCard({ auction: auction.json() }) }
    })
    return auction
  }

  userJoinAuction(userID, auctionID) {
    let user = this.state.users.find(user => user.id == userID)
    let auction = this.state.auctions.find(auction => auction.id == auctionID)
    return user
      && auction
      && user.joinAuction(auction)
      && wsm.roomSend(`/auction/${auction.id}`, {
        action: "observerJoin",
        data: { userID: user.id }
        // data: { newCard: UserCard({ user: user.json() }) }
      })
  }

  userleaveAuction(userID, auctionID) {
    let user = this.state.users.find(user => user.id == userID)
    let auction = this.state.auctions.find(auction => auction.id == auctionID)
    return user
      && auction
      && user.leaveAuction(auction)
      && wsm.roomSend(`/auction/${auction.id}`, {
        action: "observerLeave",
        data: { userID: user.id }
        // data: { newCard: UserCard({ user: user.json() }) }
      })
  }
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
  findPicture(pictureID) {
    return this.state.pictures.find(picture => picture.id == pictureID)
  }
  findAuction(auctionID) {
    return this.state.auctions.find(auction => auction.id == auctionID)
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
  deltPicture(picture) {
    if (picture.canBeDeleted()) {
      picture.user.pictures = picture.user.pictures.filter(e => e !== picture)
      this.state.pictures = this.state.pictures.filter(e => e !== picture)
      return true
    }
    return false
  }
  deltAuction(auction) {
    if (auction.canBeDeleted()) {
      this.state.auctions = this.state.auctions.filter(e => e !== auction)
      return true
    }
    return false
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
      this.startState.pictures && this.startState.pictures.forEach(SingletonStore.instance.createPicture)
      this.startState.users && this.startState.users.forEach(SingletonStore.instance.createUser)
    }
  }

  getInstance() {
    return SingletonStore.instance;
  }
}

module.exports = SingletonStore;
