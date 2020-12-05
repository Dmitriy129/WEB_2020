const router = require("express").Router();

router.use(require('./auth'))
router.use('/users', require('./users'))

module.exports = router