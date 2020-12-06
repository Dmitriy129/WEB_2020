
// const wsm = (new (require("../ws"))).getInstance()

const counter = require("../../api/Counter")("paper")

module.exports = class Paper {
    constructor({ name, rule, max, count, startPrice }) {
        this.id = counter.next()
        this.name = name
        this.rule = rule
        this.max = max
        this.count = count
        this.price = this.startPrice = startPrice
        this.owners = {}
    }

    changePrice(newPrice) {
        this.price = newPrice
        //  ws.emit(price change, new price)
    }

    add(count) {
        if (count >= 0) {
            this.count += count
            /* 
            wsm.emit("count upd",{count: this.count})
            */
        }

    }

    availableCount() {
        return this.count - Object.values(this.owners).reduce((a, b) => a + b, 0)
    }

    updatePrice() {
        if (this.distribution === 'равномерное распределние') {
            this.price = Math.round(this.startPrice + ((Math.random() - 0.5) * this.max * 2));
        } else {
            this.price = Math.round(this.startPrice + ((randNorm() - 0.5) * this.max * 2));
        }
    }

    json() {
        return {
            id: this.id,
            name: this.name,
            rule: this.rule,
            max: this.max,
            count: this.count,
            availableCount: this.availableCount(),
            startPrice: this.startPrice,
            price: this.price,
            owners: this.owners,
        }
    }

}

function randNorm() {
    let t = 0;
    let n = 3;
    for (let i = 0; i < n; ++i)
        t += Math.random();
    return t / n;
}

