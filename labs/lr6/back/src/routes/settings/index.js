const router = require("express").Router();
const Store = (new (require("../../store"))).getInstance();


router.get('/', (req, res) => {
    res.send(Store.settings.json())
})
router.post('/start', (req, res) => {
    Store.start()
    res.end()
})

module.exports = router