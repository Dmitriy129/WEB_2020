import { observable, action, toJS } from 'mobx';
import http from '../api/http'
import ws from '../api/ws'
import { _localStorage } from '../api/localStorage'
// import { Auth } from "aws-amplify";
// import { signIn, signOut } from '../api/auth'

export default class Me {

    constructor() {
        this.user = observable({})
        this.isAuthorized = observable.box(false)


    }

    wsListnersInit() {
        ws.on("balanceChanged", (data) => this.checkAuth())
    }

    setUser = action((newUser) => {
        Object.getOwnPropertyNames(this.user).forEach(prop => delete this.user[prop])
        Object.assign(this.user, newUser)
        this.isAuthorized = Object.keys(this.user).length > 0
    })



    checkAuth = action(() => {
        debugger
        return http.get(`/access`)
            .then(user => {
                debugger
                console.log('user', user)
                this.setUser(user)
                _localStorage.set("user", user)
            })
        //     if (toJS(this.isAuthorized)) resolve(this.user)
        //     else reject()
        // })
    })

    // tryBuyPapers = action((data) => {
    //     ws.emit("tryBuyPapers", data)
    // })



    signIn = action(async (code) => {
        debugger
        return http.get(`/git?code=${code}`)
            .then(user => {
                debugger
                console.log('user', user)
                this.setUser(user)
                _localStorage.set("user", user)
            })
        // window?.location = `https://github.com/login/oauth/authorize?response_type=code&client_id=${process.env.GIT_CLIENT_ID}&redirect_uri=${process.env.GIT_REDIRECT_URL}`
    })

    signOut = action(async () => {
        this.setUser({})
    }
    )

}
