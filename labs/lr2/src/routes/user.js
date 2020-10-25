const router = require("express").Router();
const State = require("../state");
var datadb = new State().getInstance().getState();

router.get("/:userID", (req, res) => {
  // console.log(req.headers.authorization);
  let userID = req.params.userID;
  let user = datadb.users.find((user) => user.id == userID);
  let data = user
    ? user.books
        .map((bookID) => {
          let book = datadb.booksList.find((book) => book.id === bookID);
          let bookData = {};
          book &&
            Object.keys(datadb.usersBookInterface).forEach(
              (key) => (bookData[key] = book[key])
            );
          return bookData;
        })
        .filter((obj) => {
          for (let key in obj) return true;
          return false;
        })
    : [];
  res.render("includes/UserInfo.pug", {
    user: {
      login: user.login,
      name: user.name,
      surname: user.surname,
      img: user.img,
    },
    table: {
      header: datadb.usersBookInterface,
      data,
    },
  });
});

module.exports = router;
