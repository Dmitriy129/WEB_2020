

const wsm = (new (require("../ws"))).getInstance()
const pictureCounter = require("../api/Counter")("picture")
const { saveImg } = require("../api")


module.exports = class Picture {
    constructor({ name, author, description, cost, img }) {
        this.id = pictureCounter.next()
        this.name = name
        this.author = author
        this.description = description
        this.cost = cost || 1
        this.img = img && (typeof img === "string" ? img : saveImg(img)) || process.env.DEFAULT_IMG_PATH
    }

    updateInfo({ name, author, description, cost, img }) {
        this.name = name || this.name
        this.author = author || this.author
        this.description = description || this.description
        this.cost = cost || this.cost
        this.img = img && (typeof img === "string" ? img : saveImg(img)) || this.img
    }

    isOwner(user) {
        return this.user && this.user.id === user.id
    }
    canBeDeleted() {
        return !this.auction || Object.entries(this.auction).length === 0
    }

    json() {
        return {
            auction: this.auction && Object.entries(this.auction).length > 0 ? this.auction.json() : false,
            id: this.id,
            name: this.name,
            author: this.author,
            description: this.description,
            cost: parseInt(this.cost),
            img: this.img,
            user: this.user && this.user.jsonShort(),
        }
    }

    jsonShort() {
        return {
            auction: this.auction ? { id: this.auction.id } : false,
            id: this.id,
            name: this.name,
            author: this.author,
            description: this.description,
            cost: parseInt(this.cost),
            img: this.img,
            user: this.user && this.user.jsonShort(),
        }
    }

}

