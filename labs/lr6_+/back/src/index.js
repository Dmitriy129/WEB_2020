module.exports = function run() {
    const { serverApp, app } = require("./app");
    // require('./app');
    const Ws = (new (require("./socket")))
    Ws.getInstance().init(serverApp);
    // const Store = (new (require("./store")))
    // debugger
    // Store.getInstance().init(serverApp);
    // debugger
    app.use('/api', require("./routes"));
}