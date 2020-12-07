const router = require("express").Router();

router.use(require('./auth'))
router.use('/users', require('./users'))
router.use('/papers', require('./papers'))
router.use('/settings', require('./settings'))

module.exports = router