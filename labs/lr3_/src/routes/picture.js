const router = require("express").Router();
const Store = (new (require("../store"))).getInstance();
const wsm = (new (require("../ws"))).getInstance();


const pug = require('pug');
const PictureCard = pug.compileFile(process.env.DEFAULT_PUG_PATH + 'includes/PictureCard.pug');
const PictureForm = pug.compileFile(process.env.DEFAULT_PUG_PATH + 'includes/PictureForm.pug');
const PictureInfoBlock = pug.compileFile(process.env.DEFAULT_PUG_PATH + 'includes/PictureInfoBlock.pug');


router.get("/:id", (req, res) => {
    let picture = Store.findPicture(req.params.id)
    if (picture) res.render("Picture", { picture: picture.json(), me: req.user.me(), owner: picture.isOwner(req.user) })
    else res.status(404).end("Picture not foussnd")
});

router.get("/form/:id", (req, res) => {
    let picture = Store.findPicture(req.params.id)
    // if (picture) res.render("includes/PictureForm", { form: picture.json() })
    if (picture && picture.isOwner(req.user)) res.render("includes/ModalWindow", { content: PictureForm({ form: { ...picture.json(), action: "edit" } }) })
    else res.status(404).end("Picture not found")
});

router.put("/", (req, res) => {
    let picture = Store.createPicture(req.body)
    if (picture) {
        req.user.takePicture(picture)
        res.send({ success: true, newPicture: PictureCard({ picture: picture.json() }) })
        // wsm.roomSend("pictures", { action: "updated", router })
    }
    else res.send({ success: false })
});
router.post("/edit/:id", (req, res) => {
    let picture = Store.findPicture(req.params.id)
    if (picture) {
        picture.updateInfo(req.body)
        res.send({ success: true, editedPicture: PictureInfoBlock({ picture: picture.json(), owner: picture.isOwner(req.user) }) })
    }
    else res.send({ success: false })
});

router.delete("/:id", (req, res) => {
    let picture = Store.findPicture(req.params.id)
    if (picture) res.send({ success: Store.deltPicture(picture) })
    else res.status(404).end("Picture not found")
});
module.exports = router;
