const router = require("express").Router();
const Store = (new (require("../store"))).getInstance();

router.get("/", (req, res) => { res.render("MainList", { auctions: Store.getAuctions(), me: req.user.me() }) });

module.exports = router;
