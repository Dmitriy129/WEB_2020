const router = require("express").Router();
const Store = (new (require("../store"))).getInstance();

const pug = require('pug');
const AuctionForm = pug.compileFile(process.env.DEFAULT_PUG_PATH + 'includes/AuctionForm.pug');
const AuctionCard = pug.compileFile(process.env.DEFAULT_PUG_PATH + 'includes/AuctionCard.pug');
const AuctionInfoBlock = pug.compileFile(process.env.DEFAULT_PUG_PATH + 'includes/AuctionInfoBlock.pug');

router.get('/', (req, res) => res.redirect('/auctions'))

router.get("/:id", (req, res) => {
    let auction = Store.findAuction(req.params.id)
    if (auction)
        if (auction.checkAccess(req.user)) {
            // Store.userJoinAuction(req.user.id, auction.id)
            res.render("Auction", { auction: auction.json(), me: req.user.me(), owner: auction.isOwner(req.user) })
        }
        else res.status(404).end("No access")

    else res.status(404).end("Auction not found")
});
router.get("/:id/history", (req, res) => {
    let auction = Store.findAuction(req.params.id)
    if (auction) res.render("AuctionHistory", { table: auction.getHistoryShort(), me: req.user.me(), owner: auction.isOwner(req.user) })
    else res.status(404).end("Auction not found")
});

router.put("/", (req, res) => {
    let auction = Store.createAuction({
        ...req.body,
        picture: Store.findPicture(req.body.picture),
        owner: req.user
    })
    if (auction) res.send({ success: true, id: auction.id, newAuction: AuctionCard({ auction: auction.json() }) })
    else res.send({ success: false })
});

router.get("/form/create/:id", (req, res) => {
    let picture = Store.findPicture(req.params.id)
    if (picture) res.render("includes/ModalWindow", { content: AuctionForm({ form: { cost: picture.cost, id: picture.id } }) })
    else res.status(404).end("Picture not found")
});

router.get("/form/edit/:id", (req, res) => {
    let auction = Store.findAuction(req.params.id)
    if (auction) res.render("includes/ModalWindow", { content: AuctionForm({ form: { ...auction.json(), action: 'edit' } }) })
    else res.status(404).end("Auction not found")
});

router.post("/:id/trybuy", (req, res) => {
    let auction = Store.findAuction(req.params.id)
    // if (auction) res.render("includes/ModalWindow", { content: AuctionForm({ form: auction.json() }) })
    if (auction) {
        const r = req.user.tryBuy(auction)
        res.send({ success: r })
        //TODO ws to users
    }
    else res.status(404).end("Auction not found")
});
router.post("/edit/:id", (req, res) => {
    let auction = Store.findAuction(req.params.id)
    if (auction) {
        auction.updateInfo(req.body)
        res.send({ success: true, editedAuction: AuctionInfoBlock({ auction: auction.json(), owner: auction.isOwner(req.user) }) })
    }
    else res.send({ success: false })
});


router.delete("/:id", (req, res) => {
    let auction = Store.findAuction(req.params.id)
    if (auction) res.send({ success: Store.deltAuction(auction) })
    else res.status(404).end("Auction not found")
});

module.exports = router;
