import { observable, action, toJS } from 'mobx';
import http from '../api/http'
import { _localStorage } from '../api/localStorage'
// import { Auth } from "aws-amplify";
// import { signIn, signOut } from '../api/auth'

export default class User {

    constructor() {
        this.user = observable({})
        this.isAuthorized = observable.box(false)
    }

    setUser = action((newUser) => {
        Object.getOwnPropertyNames(this.user).forEach(prop => delete this.user[prop])
        Object.assign(this.user, newUser)
        this.isAuthorized = Object.keys(this.user).length > 0
    })

    checkAuth = action(() => {
        debugger

        return http.get(`/api/access`)
            .then(user => {
                debugger
                console.log('user', user)
                this.setUser(user)
                _localStorage.set("user", user)
            })
        //     if (toJS(this.isAuthorized)) resolve(this.user)
        //     else reject()
        // })
    }
    )


    signIn = action(async (code) => {
        debugger
        return http.get(`/api/git?code=${code}`)
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
