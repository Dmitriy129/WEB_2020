const router = require("express").Router();
const State = require("../state");
const api = require("../api");

const removeBook = api.removeBook;
const editBook = api.editBook;

var datadb = new State().getInstance().getState();

router.post("/", (req, res, next) => {
  if (req.body.action === "remove" || req.body.action === "edit") next();
  else if (req.body.action === "filter") {
    let conf = req.body.conf;
    res.render("includes/PTable", {
      table: {
        header: datadb.bookInterface,
        data: datadb.booksList.filter(
          (book) =>
            (conf.availability === undefined ||
              (conf.availability === true
                ? book.availability === "Есть в наличии"
                : book.availability === "Нет в наличии")) &&
            (!conf.dateFrom ||
              new Date(conf.dateFrom) < new Date(book.releaseDate)) &&
            (!conf.dateTo ||
              new Date(conf.dateTo) >= new Date(book.releaseDate))
        ),
        actions: true,
      },
    });
  }
});

router.post("/:bookID", (req, res) => {
  if (req.body.action === "remove") {
    removeBook(req.params.bookID);
    res.render("includes/PTable", {
      table: {
        header: datadb.bookInterface,
        data: datadb.booksList,
        actions: true,
      },
    });
  } else if (req.body.action === "edit") {
    editBook({ ...req.body.data, id: req.params.bookID });
    res.render("includes/PTable", {
      table: {
        header: datadb.bookInterface,
        data: datadb.booksList,
        actions: true,
      },
    });
  }
});

module.exports = router;
