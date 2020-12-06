const router = require("express").Router();
const Store = (new (require("../../store"))).getInstance();


router.get('/', (req, res) => {
    const papers = Store.getPapers()
    res.send(papers)
})
router.post('/tryBuy', (req, res) => {
    const { id, count } = req.body
    Store.tryBuyPaper(req.user.id, id, count)
    res.status(200).send({ "success": true })
})
router.post('/trySell', (req, res) => {
    const { id, count } = req.body
    Store.trySellPaper(req.user.id, id, count)
    res.status(200).send({ "success": true })
})
router.post('/tryAdd', (req, res) => {
    const { id, count } = req.body
    Store.addPapers(id, count)
    res.status(200).send({ "success": true })
})
router.get('/:id', (req, res) => {
    console.log(req.params.id);
})

module.exports = router