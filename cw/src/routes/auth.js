const router = require("express").Router();
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const Store = (new (require("../store"))).getInstance();

const { getCookie } = require('../api')

// router.use((req, res, next) => {
//   req.user = Store.getStore().users[0]
//   res.cookie("userID", req.user.id, {
//     maxAge: 900000,
//     // httpOnly: true,
//   });
//   res.cookie("accessToken", req.user.accessToken, {
//     maxAge: 900000,
//     httpOnly: true,
//   });
//   next();
// });

router.use((req, res, next) => {
  let user = Store.userCheckAccess(
    getCookie(req.headers.cookie, "userID"),
    getCookie(req.headers.cookie, "accessToken")
  );

  if (user) {
    req.user = user;
    res.cookie("userID", user.id, {
      maxAge: 900000,
      // httpOnly: true,
    });
    res.cookie("accessToken", user.accessToken, {
      maxAge: 900000,
      httpOnly: true,
    });
    if (req._parsedUrl.pathname === "/login") {
      res.redirect("/");
      return;
    }
  } else {
    res.clearCookie("userID")
    res.clearCookie("accessToken")
    if (
      req._parsedUrl.pathname !== "/login" &&
      req._parsedUrl.pathname !== "/git"
    ) {
      res.redirect("/login")
      return;
    }
  }

  next();
});

router.get("/git", (req, res) => {
  // console.log("/git");
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
    })
      .then(
        (response) => {
          let accessToken = uuidv4();
          let user =
            Store.findUser(response.data.id) ||
            Store.createUser({
              id: response.data.id,
              name: response.data.name,
              login: response.data.login,
              img: response.data.avatar_url,
            })
          user.accessToken = accessToken;
          res.cookie("userID", response.data.id, {
            maxAge: 900000,
            // httpOnly: true,
          });
          res.cookie("accessToken", accessToken, {
            maxAge: 900000,
            httpOnly: true,
          });
          res.redirect("/");
        })
      .catch((err) => {
        res.status(403).send("Ошибка авторизации")
      })
  })
    .catch((err) => {
      res.status(403).send("Ошибка авторизации")
    })
});

// router.get("/login", (req, res) => {
//   res.render("Login", {
//     clientId: process.env.GIT_CLIENT_ID,
//     redirect_uri: process.env.GIT_REDIRECT_URL,
//   });
// });
// router.get("/logout", (req, res) => {
//   res.clearCookie("userID");
//   res.clearCookie("accessToken");
//   res.redirect("/login");
// });

module.exports = router;
