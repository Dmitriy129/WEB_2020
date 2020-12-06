import http from "../api/http"

// const http = require("../api/http");


// const create
// const read
// const readList
// const update
// const remove

export const create = () => { }
export const read = (name, id) => {
    // name = "user" || "paper" || "settings"
    const url = `/${name}s/${id}`
    return http.get(url)
}
export const readList = (name) => {
    // name = "user" || "paper" || "settings"
    debugger
    const url = `/${name}s`
    return http.get(url)
}
export const update = (name, data) => {
    // name = "user" || "paper" || "settings"
    const url = `/${name}s/${data.action}`
    return http.post(url, data.data)
}
export const remove = (name, id) => {
    // name = "user" || "paper" || "settings"
    const url = `/${name}s/${id}`
    return http.delete(url)
}


const CRUD = {
    create,
    read,
    readList,
    update,
    delete: remove
}

export default CRUD

