const router = require("express").Router();
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const State = require("../state");
var datadb = new State().getInstance().getState();

router.get("/git", (req, res) => {
  console.log("/git");
  const requestToken = req.query.code;

  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${process.env.GIT_CLIENT_ID}&client_secret=${process.env.GIT_CLIENT_SECRET}&code=${requestToken}`,
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
    axios({
      method: "get",
      url: `https://api.github.com/user`,
      headers: {
        Authorization: "token " + response.data.access_token,
      },
    }).then((response) => {
      let accessToken = uuidv4();
      let userIndex = datadb.users.findIndex(
        (user) => user.id == response.data.id
      );
      if (userIndex <= -1) {
        userIndex = datadb.users.length;
        datadb.users.push({
          id: response.data.id,
          name: response.data.name && response.data.name.split(" ")[0],
          surname: response.data.name && response.data.name.split(" ")[1],
          login: response.data.login,
          img: response.data.avatar_url,
          accessToken,
          books: [],
        });
      } else datadb.users[userIndex].accessToken = accessToken;
      res.cookie("userID", response.data.id, {
        maxAge: 900000,
        httpOnly: true,
      });
      res.cookie("accessToken", accessToken, {
        maxAge: 900000,
        httpOnly: true,
      });
      res.redirect("/");
    });
  });
});

router.get("/login", (req, res) => {
  res.render("Login", {
    clientId: process.env.GIT_CLIENT_ID,
    redirect_uri: process.env.GIT_REDIRECT_URL,
  });
});
router.get("/logout", (req, res) => {
  res.clearCookie("userID");
  res.clearCookie("accessToken");
  res.redirect("/login");
});

module.exports = router;
