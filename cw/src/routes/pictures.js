const router = require("express").Router();
const Store = (new (require("../store"))).getInstance();
const wsm = (new (require("../ws"))).getInstance();

// const wsm = require("../app").wsm


router.get("/", (req, res) => {
    res.render("MainList", { pictures: Store.getPictures(), me: req.user.me() })
    // wsm.send("picture added")
});
router.get("/update", (req, res) => {
    res.render("List", { pictures: Store.getPictures(), me: req.user.me() })
    // wsm.send("picture added")
});

module.exports = router;
