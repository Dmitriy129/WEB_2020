const name = localStorage.getItem('gamer_name')

function updateRecords () {
    let arr
    if (localStorage.hasOwnProperty('higthscores')) {
        arr = JSON.parse(localStorage.getItem('higthscores'))
        arr.push({ name: name, score: gameManager.players_steps })
        arr.sort(function (a, b) {
            return a.score - b.score
        })

        while (arr.length > 10) {
            arr.pop()
        }
        localStorage.setItem('higthscores', JSON.stringify(arr))
    } else {
        arr = []
        arr.push({ name: name, score: gameManager.players_steps })
        localStorage.setItem('higthscores', JSON.stringify(arr))
    }
    writeRecord()
}

function writeRecord () {
    const arr = JSON.parse(localStorage.getItem('higthscores'))
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
}

function store () {
    const input = document.getElementById('input')
    const name = input.value
    if (name != '') {
        localStorage.setItem('gamer_name', name)
        window.location.href = ('sokoban.html')
    } else {
        window.alert('Введите имя')
    }
}

function set_name () {
    if (localStorage.hasOwnProperty('gamer_name')) {
        const name = localStorage.getItem('gamer_name')
        const input = document.getElementById('input')
        input.value = name
    }
}
