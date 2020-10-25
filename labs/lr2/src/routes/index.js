const router = require("express").Router();
const State = require("../state");
var datadb = new State().getInstance().getState();

router.get("/", (req, res) => {
  let data = {
    booksQuantity: req.user.books.length,
    userLogin: req.user.login,
    table: {
      header: datadb.bookInterface,
      data: datadb.booksList,
      actions: true,
    },
  };
  res.render("BooksList", data);
});

module.exports = router;
