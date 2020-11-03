
// const ws = new WebSocket('ws://localhost');
const ws = new WebSocket(`wss://${document.location.host}`);

const wsSend = (action, data) => ws.send(JSON.stringify({ action, ...data }))
const wsJoin = (room) => wsSend('join', { room })
const wsLeave = (room) => wsSend('leave', { room })
const wsMsg = (msg) => wsSend('msg', { msg })
const wsConnectUser = (userID) => wsSend('connectUser', { userID })
window.wsOnMsg = (action, cb) => {
    //  console.log('action :>> ', action);
    wsActions.push({ action, cb })
}

var wsActions = []

ws.onopen = function () {
    //  console.log("Соединение установлено.");
    const userID = getCookie("userID")
    userID && wsConnectUser(userID)
    wsJoin(document.location.pathname)
};

ws.onclose = function (event) {
    if (event.wasClean) {
        //  console.log('Соединение закрыто чисто');
    } else {
        //  console.log('Обрыв соединения');
    }
    //  console.log('Код: ' + event.code + ' причина: ' + event.reason);
};

// ws.onmessage = function (event) {
//     //  console.log("Получены данные: " + event.data);
// };

ws.onmessage = function (event) {
    var data = {}
    try { data = JSON.parse(event.data) }
    catch (e) { data = { msg: event.data } }

    //  console.log("Получены данные: ", data);
    wsActions.forEach(e => e.action === data.action && e.cb(data.data))
};

ws.onerror = function (error) {
    //  console.log("Ошибка " + error.message);
};

// url praser (no)

// ws.send('join', "fff")

window.onunload = () => {
    wsLeave(document.location.pathname)
}

const getCookie = function (name) {
    const cookie = document.cookie
    if (cookie) {
        const match = cookie.match(new RegExp("(^| )" + name + "=([^;]+)", "g"));
        if (match)
            for (let key in match) {
                let val = match[key].split("=")[1];
                if (val && val !== "undefined") return val;
            }
    }
};

// module.exports = { wsSend, wsJoin, wsLeave, wsMsg, wsConnectUser, wsOnMsg }