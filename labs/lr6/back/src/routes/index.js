const router = require("express").Router();

router.use(require('./auth'))
router.use('/users', require('./users'))
router.use('/papers', require('./papers'))

module.exports = router