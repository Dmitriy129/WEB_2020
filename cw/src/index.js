module.exports = async () => {
    await require('./app')
    await new (require('./store'))
}
// module.exports = () =>
//     require('./env')
//         .then(() => require('./app'))
//         .then(() => new (require('./store')))