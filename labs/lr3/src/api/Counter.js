
class Counter {
    addCounter(name) {
        this.count || (this.count = {})
        if (name) {
            // console.log(this.count)
            this.count[name] || (this.count[name] = 0)
        }
    }

    nextIndex(name) {
        return this.count[name]++
    }
}

class CounterSingleton {
    constructor(name) {
        if (!CounterSingleton.instance) {
            CounterSingleton.instance = new Counter();
        }
        CounterSingleton.instance.addCounter(name)

    }
    getInstance() {
        return CounterSingleton.instance;
    }
}

class MainCounter extends CounterSingleton {
    constructor(counterName) {
        super(counterName)
        this.counterName = counterName
    }
    next() {
        return this.getInstance().nextIndex(this.counterName)
    }
}

module.exports = (name) => new MainCounter(name)
// module.exports.UserCounter = new MainCounter("user")
// module.exports.ImageCounter = new MainCounter("image")
// module.exports.AuctionCounter = new MainCounter("auction")
