const router = require("express").Router();
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const Store = (new (require("../../store"))).getInstance();

const { getCookie } = require('../../api')

router.use((req, res, next) => {
    const userID = req.headers?.authorization?.split("#")[0]
    const accessToken = req.headers?.authorization?.split("#")[1]
    let user = Store.userCheckAccess(userID, accessToken);

    if (user) {
        req.user = user;
        // res.cookie("userID", user.id, {
        //     maxAge: 900000,
        //     // httpOnly: true,
        // });
        // res.cookie("accessToken", user.accessToken, {
        //     maxAge: 900000,
        //     httpOnly: true,
        // });
        // if (req._parsedUrl.pathname === "/auth") {
        //     res.redirect("/");
        //     return;
        // }
    } else {
        // res.clearCookie("userID")
        // res.clearCookie("accessToken")
        if (
            req._parsedUrl.pathname !== "/gitapi" &&
            req._parsedUrl.pathname !== "/git"
        ) {
            // res.redirect("/auth")
            res.status(403).send("Ошибка аутетификации")
            return;
        }
    }

    next();
});



router.get("/git", (req, res) => {
    console.log("/git");
    const requestToken = req.query.code;

    axios({
        method: "post",
        url: `https://github.com/login/oauth/access_token?client_id=${process.env.GIT_CLIENT_ID}&client_secret=${process.env.GIT_CLIENT_SECRET}&code=${requestToken}`,
        headers: {
            accept: "application/json",
        },
    })
        .then((response) => {
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
                        const userInfo = {
                            id: response.data.id,
                            name: response.data.name,
                            login: response.data.login,
                            img: response.data.avatar_url,
                        }

                        let user = Store.findUser(userInfo.id)

                        if (user) {

                            user.updateInfo(userInfo)

                        }
                        else user = Store.createUser(userInfo)
                        user.accessToken = accessToken;
                        if (!user?.confirmed)
                            user?.confirm()
                        // res.cookie("userID", response.data.id, {
                        //     maxAge: 900000,
                        //     // httpOnly: true,
                        // });
                        // res.cookie("accessToken", accessToken, {
                        //     maxAge: 900000,
                        //     // httpOnly: true,
                        // });
                        // res.redirect("/");
                        res.send(user.json())
                    })
                .catch((err) => {
                    res.status(403).send("Ошибка авторизации")
                })
        })
        .catch((err) => {
            res.status(403).send("Ошибка авторизации")
        })
});

router.get("/gitapi", (req, res) => {
    console.log('gitapi');
    res.redirect(`https://github.com/login/oauth/authorize?response_type=code&client_id=${process.env.GIT_CLIENT_ID}&redirect_uri=${process.env.GIT_REDIRECT_URL}`)
});
router.get("/logout", (req, res) => {
    res.clearCookie("userID");
    res.clearCookie("accessToken");
    res.redirect("/login");
});
router.get("/access", (req, res) => {
    res.send(req.user.json());
})

module.exports = router;
