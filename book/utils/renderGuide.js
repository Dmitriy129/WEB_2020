const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// По размерам экрана
// canvas.height = window.innerHeight
// canvas.width = window.innerWidth

// Отображение линии

ctx.moveTo(50, 70)
ctx.lineTo(100, 50)
ctx.stroke()

// Отображение прямоугольника

ctx.strokeStyle = 'green'
ctx.fillStyle = 'blue'
ctx.shadowBlur = 10
ctx.shadowColor = 'brown'
ctx.rect(10, 30, 80, 40)
ctx.fill()
ctx.stroke()

// Отображение текста

ctx.strokeText('текст', 10, 10)
ctx.stroke()

// Отображение зигзага

ctx.lineWidth = 10
ctx.strokeStyle = '#0000ff'
const x = [40, 70, 100, 130, 160, 190]
const y = [40, 80, 40, 80, 40, 80]
ctx.moveTo(10, 80)
ctx.beginPath()
for (let i = 0; i < x.length; i++) {
    ctx.lineTo(x[i], y[i])
}

// Несколько прямоугольников

function square (side, x, color) {
    ctx.strokeStyle = color
    ctx.strokeRect(x, 10, side, side)
    ctx.stroke()
}

ctx.lineWidth = 5
square(15, 10, 'red')
square(25, 50, 'green')

// Отображение рисунков

const image = new Image()
image.onload = function () {
    ctx.drawImage(image, 10, 10, 80, 80)
}
image.src = 'image.jpg'

// Отображение анимации

let xx = 10
function move () {
    if (xx < 200) xx += 5
    else xx = 10
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image2, x, 10, 80, 80)
}

const image2 = new Image()
image2.onload = function () {
    setInterval(move, 100)
}
image2.src = 'image.jpg'

// Трансформация изображения

const image3 = new Image()
image3.onload = function () {
    ctx.save()
    ctx.translate(40, -10)
    ctx.rotate(30 * Math.PI / 180)
    ctx.scale(0.3, 0.3)
    ctx.drawImage(image3, 0, 0)
    ctx.restore()

    ctx.save()
    ctx.rotate(-30 * Math.PI / 180)
    ctx.translate(100, 100)
    ctx.scale(0.4, 0.4)
    ctx.drawImage(image3, 0, 0)
    ctx.restore()
}
image2.src = 'image.jpg'

// ====== JSON редактор

mapManager.loadMap('tilemap.json')
spriteManager.loadAtlas('atlas.json', 'img/tank.png')
mapManager.parseEntities()
mapManager.draw(ctx)
