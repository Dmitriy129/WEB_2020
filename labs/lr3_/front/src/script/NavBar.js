// import { wsOnMsg } from './ws'
// import $ from "jQuery"

// import('./ws').then(({ wsOnMsg }) => {
// import('./ws').then((module) => {
// //  console.log('module :>> ', module);
wsOnMsg('balanceUpdated', (data) => {
    //  console.log("balanceUpdated:", data);
    $(`#navbar_balance`).html(Math.round(data.newBalance))
})
wsOnMsg('picturesQUpdated', (data) => {
    //  console.log("picturesQUpdated:", data);
    $(`#navbar_picturesQ`).html(Math.round(data.picturesQ))
})

// });


