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

export const update = (oldData, newData) =>
    CRUD.update(oldData, newData)

export const remove = (id) =>
    CRUD.delete(id)



const UserCRUD = {
    create,
    read,
    readList,
    update,
    delete: remove
}

export default UserCRUD