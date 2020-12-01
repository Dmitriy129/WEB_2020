const recordsManager = {
    updateRecords () {
        let arr = []
        // eslint-disable-next-line no-prototype-builtins
        if (localStorage.hasOwnProperty('records')) {
            arr = JSON.parse(localStorage.getItem('records'))
            arr.push({ name: name, score: gameManager.players_steps })
            arr.sort(function (a, b) {
                return a.score - b.score
            })

            while (arr.length > 10) {
                arr.pop()
            }
            localStorage.setItem('records', JSON.stringify(arr))
        } else {
            arr = []
            arr.push({ name: name, score: gameManager.players_steps })
            localStorage.setItem('records', JSON.stringify(arr))
        }
        writeRecord()
    },

    writeRecord () {
        const arr = JSON.parse(localStorage.getItem('records'))
        let table = '<table class="simple-little-table">'
        for (let i = 0; i < arr.length; i++) {
            table += '<tr>'
            table += '<td>' + (Number(i) + 1) + '</td>'
            table += '<td>' + arr[i].name + '</td>'
            table += '<td>' + arr[i].score + '</td>'
            table += '</tr>'
        }
        table += '</table>'
        document.getElementById('table').innerHTML = table
    },

    store () {
        const input = document.getElementById('input')
        const name = input.value
        if (name != '') {
            localStorage.setItem('name', name)
            window.location.href = ('sokoban.html')
        } else {
            window.alert('Введите имя')
        }
    },

    set_name () {
        if (localStorage.hasOwnProperty('name')) {
            const name = localStorage.getItem('name')
            const input = document.getElementById('input')
            input.value = name
        }
    }
}
