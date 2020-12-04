
export const _localStorage = {
    get(key) {
        return JSON.parse(window?.localStorage.getItem(key) || "{}")
    },
    set(key, value) {
        window?.localStorage.setItem(key, JSON.stringify(value))
    }
}