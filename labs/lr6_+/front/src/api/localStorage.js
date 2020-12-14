
const _localStorage = {
    get(key) {
        // debugger
        // console.log("get")
        try {
            return JSON.parse(window?.localStorage.getItem(key) || "{}")
        }
        catch (error) {
            return {}
        }
    },
    set(key, value) {
        // debugger
        // console.log("set")
        try {
            window?.localStorage.setItem(key, JSON.stringify(value))
        }
        catch (error) {
        }
    }
}

export default _localStorage