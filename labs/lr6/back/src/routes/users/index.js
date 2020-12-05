const router = require("express").Router();
const Store = (new (require("../../store"))).getInstance();


router.get('/', (req, res) => {
    const users = Store.getUsers()
    res.send(users)
})
router.get('/:id', (req, res) => {
    console.log(req.params.id);
})

module.exports = router