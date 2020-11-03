module.exports = (config = {}) =>
    require('./env')
        .then(() => require('./app'))
        .then(() => (new (require('./store'))).initState(config.startData))