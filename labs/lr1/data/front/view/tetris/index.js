localStorage.name || (window.location = '/')
var fsObj = [
    [
        ["1111"],
        ["01", "01", "01", "01"]
    ],
    [
        ["011", "110"],
        ["010", "011", "001"]
    ],
    [
        ["110", "011"],
        ["001", "011", "010"]
    ],
    [
        ["111", "010"],
        ["01", "11", "01"],
        ["010", "111"],
        ["10", "11", "10"]
    ],
    [
        ["11", "11"]
    ],
    [
        ["010", "010", "011"],
        ["111", "100"],
        ["11", "01", "01"],
        ["001", "111"]
    ],
    [
        ["01", "01", "11"],
        ["100", "111"],
        ["11", "10", "10"],
        ["111", "001"]
    ]
]
var now = [3, 0]
var next = [3, 0]
var next1 = [3, 0]
var position = [4, 0]
var speed = 500
var speedStep = 10

var gridSize = {
    x: 10,
    y: 15
}
var stepTimeout;
var status = false;
var resultHTML = document.querySelector('#result')

var statusChange = function (newStatus) {
    status = newStatus
    document.getElementById('status').innerText = newStatus ? "Game is running" : "Game over"
    document.getElementById('startBtn').disabled = newStatus
    document.getElementById('endGameBtn').disabled = !newStatus
}

var gP = function (x, y) {
    return document.querySelector('[data-y="' + y + '"] [data-x="' + x + '"]');
};
var newFigure = function () {
    now = next
    position = [4, 0]
    let a = Math.floor(Math.random() * fsObj.length)
    let b = Math.floor(Math.random() * fsObj[a].length)
    next = next1
    next1 = [a, b]
    drawNext()

};

var draw = function (ch, cls) {
    console.log(position)
    var f = fsObj[now[0]][now[1]].map(function (a) {
        return a.split('')
    });
    for (var y = 0; y < f.length; y++)
        for (var x = 0; x < f[y].length; x++)
            if (f[y][x] == '1') {
                if (x + position[0] + ch[0] > gridSize.x - 1 ||
                    x + position[0] + ch[0] < 0 ||
                    y + position[1] + ch[1] > gridSize.y - 1 ||
                    gP(x + position[0] + ch[0], y + position[1] + ch[1]).classList.contains('on'))
                    return false;
                gP(x + position[0] + ch[0], y + position[1] + ch[1]).classList.add(cls !== undefined ? cls : 'now');
            }
    position = [position[0] + ch[0], position[1] + ch[1]];
}

var deDraw = function () {
    if (document.querySelectorAll('.now').length > 0) {
        document.querySelector('.now').classList.remove('now')
        deDraw()
    }
}

var check = function () {
    for (var i = 0; i < gridSize.y; i++)
        if (document.querySelectorAll(`[data-y="${i}"] .cell.on`).length == gridSize.x) {
            roll(i)
            resultHTML.innerHTML = Math.floor(resultHTML.innerHTML) + gridSize.x
            speed > speedStep && (speed -= speedStep)
            return check()
        }
};

var roll = function (ln) {
    if (ln > 1) {
        (document.querySelector('[data-y="' + ln + '"]').innerHTML = document.querySelector('[data-y="' + (ln - 1) + '"]').innerHTML)
        roll(ln - 1);
    }
};
var drawNext = function () {
    for (var y = 0; y < 6; y++)
        for (var x = 0; x < 6; x++)
            document.querySelector('[next-data-y="' + y + '"] [next-data-x="' + x + '"]').classList.remove('next')

    let fig = fsObj[next[0]][next[1]]

    for (var y = 0; y < fig.length; y++)
        for (var x = 0; x < fig[y].length; x++)
            if (fig[y][x] == '1') {
                document.querySelector('[next-data-y="' + Math.floor(y + 3 - fig.length / 2) + '"] [next-data-x="' + Math.floor(x + 3 - fig[y].length / 2) + '"]').classList.add('next')
            }
    for (var y = 0; y < 6; y++)
        for (var x = 0; x < 6; x++)
            document.querySelector('[next-data-1-y="' + y + '"] [next-data-1-x="' + x + '"]').classList.remove('next')

    fig = fsObj[next1[0]][next1[1]]

    for (var y = 0; y < fig.length; y++)
        for (var x = 0; x < fig[y].length; x++)
            if (fig[y][x] == '1') {
                document.querySelector('[next-data-1-y="' + Math.floor(y + 3 - fig.length / 2) + '"] [next-data-1-x="' + Math.floor(x + 3 - fig[y].length / 2) + '"]').classList.add('next')
            }
}

var kdf = function (e) {
    if (status === "false") return
    if (e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 37 || e.keyCode == 40 || e.code == "Space") e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    if (e.keyCode == 38 && false !== (now[1] = ((prv = now[1]) + 1) % fsObj[now[0]].length) && false === draw([0, 0], undefined, deDraw())) now = [now[0], prv]
    if ((e.keyCode == 39 || e.keyCode == 37) && false === draw([e.keyCode == 37 ? -1 : 1, 0], undefined, deDraw())) draw([0, 0], undefined, deDraw())
    if (e.keyCode == 40 || e.code == "Space")
        if (false === draw([0, 1], undefined, deDraw())) {
            draw([0, 0], 'on', deDraw())
            check()
            newFigure()
            if (false === draw([0, 0], undefined)) {
                speed = -1;
                alert('Your score: ' + resultHTML.innerHTML);
                endGame()
            }
        }

}
var step = function () {
    stepTimeout = setTimeout(function () {
        clearTimeout(stepTimeout)
        if (speed >= 0) {
            kdf({ keyCode: 40 })
            step()
        }
    }, speed);
}

start = function () {
    status = true
    window.addEventListener('keydown', kdf);
    resultHTML.innerHTML = 0;
    newFigure()
    statusChange(true)
    speed = 500
    step()
}



var gridGen = function () {
    var grid = document.createElement('div')
    grid.setAttribute("class", "grid")
    grid.setAttribute("style", `height: ${gridSize.y * 22}px`)
    for (let i = 0; i < gridSize.y; i++) {
        let row = document.createElement('div')
        row.setAttribute("class", "row")
        row.setAttribute("data-y", i)
        for (let j = 0; j < gridSize.x; j++) {
            let cell = document.createElement('div')
            cell.setAttribute("class", "cell")
            cell.setAttribute("data-x", j)
            row.appendChild(cell)
        }
        grid.appendChild(row)
    }
    document.getElementById('root').innerHTML = ""
    document.getElementById('root').appendChild(grid)


}

var endGame = function (score) {
    status = false
    window.removeEventListener('keydown', kdf);

    clearTimeout(stepTimeout)
    speed = -1
    saveResult(score)
    statusChange(false)
    document.querySelectorAll('.on').forEach(elem => elem.classList.remove('on'))
    document.querySelectorAll('.now').forEach(elem => elem.classList.remove('now'))

}


/* Table */
var saveResult = function (score) {
    let store = JSON.parse(localStorage.store)
    let date = new Date()
    let newStoreRow = {
        name: localStorage.name,
        score: resultHTML.innerHTML,
        date: date.getDate() + ' / ' + date.getMonth() + ' / ' + date.getFullYear()

    }

    newTableRow(newStoreRow)
    store.push(newStoreRow)
    localStorage.setItem('store', JSON.stringify(store))
}

var newTableRow = function ({
    name,
    score,
    date
}, index) {
    let rowHTML =
        `
        <tr id=tableRow_${index != null ? index : document.getElementById("scoreTable").children.length - 1}>
            <td name=name>${name}</td>
            <td name=score>${score}</td>
            <td name=date>${date}</td>
        </tr>
        `
    document.getElementById("scoreTable").children[0].innerHTML += rowHTML

}

var printStore = function () {
    let store = JSON.parse(localStorage.store)
    store.forEach(newTableRow)
}

/* check userAgent */
var checkUserAgent = function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        gridSize = {
            x: 10,
            y: 20
        }
        document.oncontextmenu = function () {
            return false
        };
    } else {
        document.getElementById('action_box').style.display = "none"
    }
}


/* init */
newFigure()
checkUserAgent()
gridGen()
document.getElementById('userName').innerHTML = localStorage.name
statusChange(false)
printStore()