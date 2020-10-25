const router = require("express").Router();
const State = require("../state");
const api = require("../api");

const addBook = api.addBook;
var datadb = new State().getInstance().getState();

router.get("/:action", (req, res, next) => {
  if (req.params.action === "new")
    res.render("includes/NewBookForm", { ...req.params });
  if (req.params.action === "edit") next();
});
router.get("/:action/:id", (req, res) => {
  console.log(datadb.booksList.find((elem) => elem.id == req.params.id).releaseDate.split('.').reverse().join('-'))
  res.render("includes/NewBookForm", {
    ...req.params,

    ...datadb.booksList.find((elem) => elem.id == req.params.id),
    releaseDate: datadb.booksList.find((elem) => elem.id == req.params.id).releaseDate.split('.').reverse().join('-'),
  });
});
router.post("/", (req, res) => {
  let book = addBook(req.body);
  res.send({
    success: true,
    redirectURL: `/ book / ${book.id}`,
  });
});

module.exports = router;
