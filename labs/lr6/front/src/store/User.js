import { observable, action } from 'mobx';
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
    
    checkAuth = action(async () =>
        await Auth.currentAuthenticatedUser(s => console.log(s))
            .then(user => {
                this.setUser(user)
            })
    )


    signIn = action(async (email, password, attributes) => {
        return await signIn(email, password, attributes)
            .then(user => {
                if (user.signInUserSession.accessToken.payload["cognito:groups"]?.find(group => group === "manager")) {
                    this.setUser(user)
                    return user
                }
                else
                    return this.signOut().then(() => { throw new Error("Пользователь не состоит в группе 'manager', поэтому не имеет доступа к содержимому ") })
            })
    })

    signOut = action(async () =>
        await signOut()
            .then(() => this.setUser({}))
    )

}
