const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => { res.redirect('/pictures') })

router.use(require("./auth"))

const routes = ["pictures", "picture", "users", "user", "auctions", "auction"]

routes.forEach(e => {
  router.use(`/${e}`, require(`./${e}`))
})
router.use(express.static(path.join(__dirname, "../../front")));

module.exports = router;

