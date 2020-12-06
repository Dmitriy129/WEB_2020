import CRUD from './default'

// const create
// const read
// const readList
// const update
// const remove
const name = "user"

export const create = (data) =>
    CRUD.read(name, data)

export const read = (id) =>
    CRUD.read(name, id)

export const readList = () =>
    CRUD.readList(name)

export const update = (data) =>
    CRUD.update(name, data)

export const remove = (id) =>
    CRUD.delete(name, id)



const UserCRUD = {
    create,
    read,
    readList,
    update,
    delete: remove
}

export default UserCRUD