const http = require("../api/http");
import defaultCRUD from './default'
import PaperCRUD from './paper'
import UserCRUD from './user'

const CRUD = {
    ...defaultCRUD,
    paper: PaperCRUD,
    user: UserCRUD,
}

export const paper = PaperCRUD
export const user = UserCRUD


export default CRUD

