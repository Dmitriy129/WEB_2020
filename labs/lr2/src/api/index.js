var fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const State = require("../state");
var datadb = new State().getInstance().getState();

const removeBook = function (id) {
  let bookIndex = datadb.booksList.findIndex((book) => book.id == id);
  submitBook(datadb.booksList[bookIndex].userID, id);
  bookIndex > -1 && datadb.booksList.splice(bookIndex, 1);
};

const editBook = function (data) {
  let index = datadb.booksList.findIndex((elem) => elem.id == data.id);
  datadb.booksList[index] = {
    ...datadb.booksList[index],
    ...data,
    releaseDate: data.releaseDate.split('-').reverse().join('.'),
    img: data.img ? saveImg(data.img) : datadb.booksList[index].img,
  };
};

const submitBook = function (userID, bookID) {
  let bookIndex = datadb.booksList.findIndex((book) => book.id == bookID);
  let userIndex = datadb.users.findIndex((user) => user.id == userID);
  if (bookIndex <= -1 || userIndex <= -1) return;

  datadb.users[userIndex].books = datadb.users[userIndex].books.filter(
    (id) => id !== bookID
  );
  datadb.booksList[bookIndex].userID = "";
  datadb.booksList[bookIndex].userlogin = "";
  datadb.booksList[bookIndex].availability = "Есть наличии";
  datadb.booksList[bookIndex].returnDate = "";
};

const takeBook = function (userID, bookID) {
  let bookIndex = datadb.booksList.findIndex((book) => book.id == bookID);
  let userIndex = datadb.users.findIndex((user) => user.id == userID);
  if (
    bookIndex <= -1 ||
    userIndex <= -1 ||
    datadb.booksList[bookIndex].userID ||
    datadb.booksList[bookIndex].userlogin
  )
    return;
  let now = new Date();
  now.setDate(now.getDate() + 10);
  datadb.users[userIndex].books.push(bookID);
  datadb.booksList[bookIndex].userID = userID;
  datadb.booksList[bookIndex].userlogin = datadb.users[userIndex].login;
  datadb.booksList[bookIndex].availability = "Нет в наличии";
  datadb.booksList[
    bookIndex
  ].returnDate = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`;
};

const addBook = function (data) {
  console.log(data)
  let newBook = {
    ...data,
    releaseDate: data.releaseDate.split('-').reverse().join('.'),
    id: uuidv4(),
    availability: "Есть в наличии",
    img: saveImg(data.img),
  };
  datadb.booksList.push(newBook);
  return newBook;
};

const saveImg = function (data) {
  if (data === undefined) return false;
  const name = `${uuidv4()}(${data.name})${data.name
    .match(/\.[A-Za-z0-9]*/gi)
    .pop()}`;
  const baseImage = data.data;
  const localPath = "front/public/savedImg/";
  const ext = baseImage.substring(
    baseImage.indexOf("/") + 1,
    baseImage.indexOf(";base64")
  );
  const fileType = baseImage.substring("data:".length, baseImage.indexOf("/"));

  const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, "gi");

  const base64Data = baseImage.replace(regex, "");
  const rand = Math.ceil(Math.random() * 1000);

  fs.writeFileSync(localPath + name, base64Data, "base64");
  return name;
};

module.exports.removeBook = removeBook;
module.exports.editBook = editBook;
module.exports.submitBook = submitBook;
module.exports.takeBook = takeBook;
module.exports.addBook = addBook;
module.exports.saveImg = saveImg;
