// import { wsOnMsg } from "./ws"
// // import $ from "jQuery"

wsOnMsg('accessUpdated', (data) => {
    $(`#auction_${data.id} > a`).remove()
    let timeStart = new Date(data.timeStart)
    if (data.access) $(`#auction_${data.id}`).append(`<a class="primaryBtn" href='/auction/${data.id}'>Войти<a/>`)
    else $(`#auction_${data.id}`).append(`<a class="dangerBtn"'>Начало в ${timeStart.getDay()}.${timeStart.getMonth()}.${timeStart.getFullYear()} ${timeStart.getHours()}:${timeStart.getMinutes()}<a/>`)
})
