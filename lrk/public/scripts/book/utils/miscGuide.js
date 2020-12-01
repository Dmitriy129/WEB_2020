// 4 глава взаимодействие с клавой

// нажатие и отжимание клавиши

function keyDown(event) {
    document.getElementById("result").innerHTML = "Нажата: "
    + event.keyCode;
}

function keyUp(event) {
    document.getElementById("result").innerHTML = "Отпущена: "
        + event.keyCode;
}

document.body.onkeydown = keyDown;
document.body.onkeyup = keyUp;

document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);


// взаимодействие с мышью

function mouseDown(event) {
    document.getElementById("result").innerHTML = "Нажата: (" +
    event.clientX + ", " + event.clientY + ")";
}

function mouseUp(event) {
    document.getElementById("result").innerHTML = "Отпущена: (" +
        event.clientX + ", " + event.clientY + ")";
}

document.body.onmousedown = mouseDown;
document.body.onmouseup = mouseUp;


// также ивент листенеры для мыши

document.body.addEventListener("mousedown", mouseDown);
document.body.addEventListener("mouseup", mouseUp);

// реализация менеждера событий

function onKeyDown(event) {
    if(event.keyCode === 32) { // клавиша пробел
        // вызов функции выстрела
    }
    if(event.keyCode === 38) { // стрелка вверх
        // вызов функции двигаться вверх
    }
    // реализаци остальных функций
}

// другой подход

var eventsManager = {
    bind: [], // сопоставление клавишам
    action: [], // действия
    setup: function(canvas) { // настройка сопоставлений
        this.bind[87] = 'up' // w - двигаться наверх
        this.bind[65] = 'left' // a - двигаться влево
        this.bind[83] = 'down' // s - двигаться вниз
        this.bind[68] = 'right' // d - двигаться вправо
        this.bind[32] = 'fire' // пробел - выстрелить
        // контроль событий мыши
        canvas.addEventListener("mousedown", this.onMouseDown);
        canvas.addEventListener("mouseup", this.onMouseUp);
        document.body.addEventListener("keydown", this.onKeyDown);
        document.body.addEventListener("keyup", this.onKeyUp);
    },
    onMouseDown: function(event) { // нажали мышь
        eventsManager.action["fire"] = true;
    },
    onMouseUp: function(event) { // отжали мышь
        eventsManager.action["fire"] = false;
    },
    onKeyDown: function(event) { // нажали на кнопку
        // проверили, есть ли сопоставление действию для события с кодом keyCode
        var action = eventsManager.bind[event.keyCode];
        if(action) { // проверка на action === true
            eventsManager.action[action] = true; // согласились
            // выполнить действие
        }
    },
    onKeyUp: function(event) { // отпустили кнопку на клавиатуре
    // проверили, есть ли сопоставление действию для события с кодом keyCode
        var action = eventsManager.bind[event.keyCode];
        if(action) { // проверка на action === true
            eventsManager.action[action] = false; // отменили
            // выполнить действие
        }
    }
};



// глава 5 реализация логики поведения объектов

var canvas = document.getElementById("canvasId");
var ctx = canvas.getContext("2d");
var pos = {x:0, y:0}; // координат квадрата
ctx.strokeStyle="#f00";
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // очистить
    ctx.strokeRect(pos.x, pos.y, 20, 20); // квадрат
    ctx.stroke(); // нарисовать
}

// отрисовка
function update() {
    if(pos.x < canvas.width - 20)
        pos.x += 4; // прямолинейное движение вправо
    else
        pos.x = 0; // сброс коорлинаты x
    if(pos.y < canvas)
        pos.y++; // прямолинейное движение вниз
    else
        pos.y = 0; // сброс координаты y
    draw(); // нарисовать объект
}
setInterval(update, 100); // вызов каждые 100мсек


// глава 7 управление звуком

// HTML
// <audio controls>
//     <source src="music.ogg" type="audio/ogg">
//     <source src="music.mp3" type="audio/mpeg">
// </audio>

// проигрывание ЗВУКА, А НЕ МЕЛОДИИ

var context = new AudioContext(); // создание звука
function loadSound(url) {
    var request = new XMLHttpRequest(); // создание асинхронного запроса
    request.open("GET", url, true);
    request.responseType = "arraybuffer"; // тип результата - байты
    request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
           playSound(buffer); // полученный поток байт - озвучить
        });
    };
    request.send();
}

function playSound(buffer) {
    var sound = context.createBufferSource(); // создается источник звука
    sound.buffer = buffer; // настраивается буфер
    sound.connect(context.destination); // подключение к колонкам
    if(!sound.start) {
        sound.start = sound.noteOn; // поддержка "старых барузеров"
    }
    sound.start(0); // проигрывание звка
}
loadSound("effects/boom.wav"); // загрузка звука


// проигрывание аудио с настройкой громкости

var context = new AudioContext();
var gainNode = context.createGain ? context.createGain() : context.createGainNode();
gainNode.connect(context.destination); // подключение у динамикам

function loadSound(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
        context.decodeAudioData(request.response,
            function (buffer) {
                playSound(buffer);
            });
    }
    request.send();
}
function playSound(buffer) {
    var sound = context.createBufferSource();
    sound.buffer = buffer;
    sound.connect(gainNode);
    sound.loop = false; // повторять
    gainNode.gain.value = 0.2; // громкость звука
    sound.start(0);
}
loadSound("effects/boom.wav"); // загрузка звука

// звук в зависимости от расстояния от игрока

function playWorldSound(path, x, y) {
    if(gameManager.player === null) {
        return;
    }
    var viewSize = Math.max(mapManager.view.w, mapManager.view.h) * 0.8;
    var dx = Math.abs(gameManager.player.pos.x - x);
    var dy = Math.abs(gameManager.player.pos.y - y);
    var distance = Math.sqrt(dx*dx + dy*dy);
    var norm = distance / viewSize; // определяем дистанцию до источнику
    if(norm > 1)
        norm = 1;
    var volume = 1.0 - norm;
    if(!volume) // если не слышно
        return;
    soundManager.play(path, {looping:false, volume:volume});
}






