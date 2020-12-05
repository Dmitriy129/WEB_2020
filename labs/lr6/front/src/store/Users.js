import { observable, action, toJS } from 'mobx';
import http from '../api/http'
import ws from '../api/ws'
// import { _localStorage } from '../api/localStorage'
// import { Auth } from "aws-amplify";
// import { signIn, signOut } from '../api/auth'
import { user as Api } from '../cruds'

export default class Users {

    constructor() {

    }

    elems = observable.array([])

    loading = observable({
        timeout: null,
        now: false,
        lastLoading: ""
    })

    setElems = action((newElems) => {
        this.elems.splice(0, this.elems.length, ...newElems)
        // this.elems.forEach(elem => elem.edited = {})
    })

    setLoading = action((newLoading) => {
        if (newLoading)
            this.loading.timeout = setTimeout(() => {
                this.loading.now = true
                clearTimeout(this.loading.timeout)
            }, 200)
        else {
            clearTimeout(this.loading.timeout)
            this.loading.now = false
        }

    })

    loadList = action(() => {
        this.setLoading(true)
        Api.readList()
            .then((elems) => {
                console.log('elems', elems)
                this.setLoading(false)
                this.setElems(elems)
                // this.elems = elems
            })
            .catch((error) => {
                console.error('error', error)
                // this.setLoading(false)
            })
        // .then()

    })



}
