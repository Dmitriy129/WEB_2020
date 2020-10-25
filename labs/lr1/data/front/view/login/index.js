
var changeName = function (form) {
    if (form.name.value) {
        localStorage.setItem("name", form.name.value)
        window.location.pathname = "/tetris"
    }
    else alert("Введите имя")
    return false
}

/* init */
localStorage.store || localStorage.setItem("store", JSON.stringify([]))
localStorage.name || localStorage.setItem("name", "")