const router = require("express").Router();
const State = require("../state");
const api = require("../api");

const takeBook = api.takeBook;
const editBook = api.editBook;
const submitBook = api.submitBook;

var datadb = new State().getInstance().getState();

router.get("/:bookID", (req, res) => {
  let book = datadb.booksList.find((book) => book.id == req.params.bookID);
  let bookUser;
  if (book) datadb.users.find((user) => user.id == book.userID);
  else {
    res.status(404).redirect("/");
    return;
  }
  res.render("BookCard.pug", {
    ...book,
    booksQuantity: req.user.books.length,
    userLogin: req.user.login,
    IhaveThis: req.user.id == book.userID,
  });
});

router.post("/:bookID", (req, res) => {
  req.body.action === "take" && takeBook(req.user.id, req.params.bookID);
  req.body.action === "submit" && submitBook(req.user.id, req.params.bookID);
  req.body.action === "edit" &&
    editBook({ ...req.body.data, id: req.params.bookID });
  res.render("includes/BookInfo.pug", {
    ...datadb.booksList.find((elem) => elem.id == req.params.bookID),
  });
});



module.exports = router;
