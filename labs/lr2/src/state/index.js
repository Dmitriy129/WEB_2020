const initState = require(`../../${process.env.DATA_INIT_FILE}`);

class State {
  constructor(initState) {
    this.state = initState;
  }
  getState(path) {
    var value = path
      ? path
          .split("/")
          .filter(Boolean)
          .reduce(
            (acc, val) => (acc === undefined ? acc : acc[val]),
            this.state
          )
      : this.state;
    return value;
  }
  setState(path, newValue) {
    let iLastSlash = path.lastIndexOf("/");
    let sObjectPath = path.substring(0, iLastSlash || 1);
    let sProperty = path.substr(iLastSlash + 1);
    this.getState(sObjectPath)[sProperty] = newValue;
    return newValue;
  }
}
class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new State(initState);
    }
  }

  getInstance() {
    return Singleton.instance;
  }
}

module.exports = Singleton;
