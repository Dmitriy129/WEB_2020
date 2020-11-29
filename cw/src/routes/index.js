const express = require("express");
const router = express.Router();
const path = require("path");

// router.get("/", (req, res) => { res.redirect('/pictures') })

// router.use(require("./auth"))

// const routes = ["pictures", "picture", "users", "user", "auctions", "auction"]

// routes.forEach(e => {
//   router.use(`/${e}`, require(`./${e}`))
// })
router.use(express.static(path.join(__dirname, "../../front/pages")));
router.use("/public",express.static(path.join(__dirname, "../../front/public")));

module.exports = router;

