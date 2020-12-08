const recordManager = {

    getLS: function (name) {
        let data = localStorage.getItem(name)
        try { return JSON.parse(data) || {} }
        catch (error) {
            this.setLS({})
            return data || {}
        }
    },
    setLS: function (name, data) {
        localStorage.setItem(name, JSON.stringify(data))
    },
    get: function () {
        return this.getLS("records_cw")
        // Object.entries(records).forEach(([name, money]))
    },
    set: function (records) {
        return this.setLS("records_cw", records)
        // Object.entries(records).forEach(([name, money]))
    },
    add: function (name, money) {
        this.set({ ...this.get(), [name]: money })
    }
}