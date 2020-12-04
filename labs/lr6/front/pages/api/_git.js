import http from '../../src/api/http'
import Store from '../../src/store'
export default (req, res) => {
    res.statusCode = 200
    debugger
    // throw req
    // console.log('req', req)
    http.get(`${req.url}`)
        .then(response => {
            debugger
            console.log('response', response)
            Store.user.signIn(response)
            res.redirect('/')
        })
        .catch(error => {
            debugger
            console.error('error', error)
            // res.redirect('/auth')
        })
    // res.json({ req: req.url })
}
