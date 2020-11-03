const router = require("express").Router();
const Store = (new (require("../store"))).getInstance();

router.get("/", (req, res) => { res.render("MainList", { users: Store.getUsers(), me: req.user.me() }) });

module.exports = router;
