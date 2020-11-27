// свободное падение

var canvas = document.getElementById("canvasId");
var ctx = canvas.getContext("2d");
var pos = {x:20, y:20, dx:0, dy:0}; // координаты и скорости
ctx.strokeStyle("#f00");
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // очистить
    ctx.strokeRect(pos.x, pos.y, 20, 20); // квадрат
    ctx.stroke(); // нарисовать
}
function update() {
    if(pos.y < canvas.height - 20) {
        pos.y += pos.dy; // движение вниз
        pos.dy += 0.4 // ускорение
    }
    else
        pos.y = pos.dy = 0; // сброс в 0
    draw(); // нарисовать объект
}
setInterval(update, 100); // вызов каждые 100мсек

// изменение двух координат с учетом свободного падения

var canvas = document.getElementById("canvasId");
var ctx = canvas.getContext("2d");
var pos = {x:20, y:320, dx:5, dy:-15}; // координаты и скорости
ctx.strokeStyle("#f00");
function draw() {
    ctx.arc(pos.x, pos.y, 10, 0, Math.PI*2); // окружность
    ctx.stroke(); // нарисовать
}
function update() {
    if(pos.x < canvas.width - 20)
        pos.x += pos.dx; // движение вправо
    else
        pos.x = 20;
    if(pos.y < canvas.height - 20) {
        pos.y += pos.dy; // движение вниз
        pos.dy += 0.4;
    }
    else {
        pos.y = 320;
        pos.dy = -15; // сброс в 0
        pos.x = 20;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // очистить
        ctx.beginPath(); // начинает рисовать сначала
    }
    draw();
}
setInterval(update, 100);


// упругое падение

var canvas = document.getElementById("canvasId");
var ctx = canvas.getContext("2d");
var pos = {x:20, y:320, dx:4, dy:-15, imp:-15}; // координаты, скорости, импульс
ctx.strokeStyle("#f00");
function draw() {
    ctx.arc(pos.x, pos.y, 10, 0, Math.PI*2); // окружность
    ctx.stroke(); // нарисовать
}
function update() {
    if(pos.x < canvas.width - 20)
        pos.x += pos.dx; // движение вниз
    else
        pos.x = 20;
    if(pos.y < canvas.height - 20) {
        pos.y += pos.dy; // движение
        pos.dy += 0.4;
    }
    else if(Math.abs(pos.imp) > 0.01) { // проверка импульса
        pos.imp = pos.dy = pos.imp / 2; // уменьшение импульса и отскок
        pos.y += pos.dy; // движение
    }
    else {
        pos = {x:20, y:320, dx:4, dy:-15, imp:-15};
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath(); // начать рисовать сначала
    }
    draw();
}
setInterval(update, 100);
