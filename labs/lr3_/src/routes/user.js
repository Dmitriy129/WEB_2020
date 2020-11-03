const router = require("express").Router();
const Store = (new (require("../store"))).getInstance();

const pug = require('pug');
const { use } = require("./auth");
const PictureCard = pug.compileFile(process.env.DEFAULT_PUG_PATH + 'includes/PictureCard.pug');
const UserCard = pug.compileFile(process.env.DEFAULT_PUG_PATH + 'includes/UserCard.pug');


router.get("/:id", (req, res) => {
    let user = Store.findUser(req.params.id)
    if (user) res.render("User", {
        user: user.json(),
        me: req.user.me(),
    })
    else res.status(404).end("User not found")
});
router.get("/card/:id", (req, res) => {
    let user = Store.findUser(req.params.id)
    if (user) res.send(UserCard({ user: user.json() }))
    else res.send(`User with id:${req.params.id} not found`)
});
router.post("/money/:id", (req, res) => {
    let user = Store.findUser(req.params.id)
    if (user) res.send({
        success: user.changeBalance(user.balance + req.body.money),
        balance: user.balance
    })
    else res.send(`User with id:${req.params.id} not found`)
});

module.exports = router;
