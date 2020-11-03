// import { wsOnMsg } from './ws'
// // import $ from "jQuery"
// import { formParser } from './Form';

const auctionInfo = $('#auctionInfo')
var interval;
// var circle = $('.circle_animation')
const timestep = 100
const initialOffset = '440';
var fullTime = $('#auction-timeInterval').text()
//  console.log("$('#auction-timeInterval') :>> ", $('#auction-timeInterval'));

wsOnMsg('runTimer', (data) => {
    //  console.log("runTimer:", data)
    data.time && runTimer(data.time)
})
wsOnMsg('newBet', (data) => {
    //  console.log("updated:", data)
    $(`#auction-costNow`).html(Math.round(data.costNow))
    $(`#auction-costNext`).html(Math.round(data.costNext))
    debugger
    console.log('fullTime :>> ', fullTime);
    console.log('data.time :>> ', data.timer);
    console.log('parseInt(data.time) :>> ', parseInt(data.timer));
    debugger
    $http.get(`/user/card/${data.userID}`)
        .then(card => {
            if ($(`#auction-userCard > #user_${data.userID}`).length === 0) {
                $(`#auction-userCard > .card.user`).remove()
                $(`#auction-userCard`).append(card)
            }
        })

    // users list
    // restart time loader
    //  console.log("need restart time loader");
    fullTime = parseInt(data.timer)
    runTimer()
})


wsOnMsg('observerJoin', (data) => {
    // $(`#cardList`).append(data.newCard)
    $(`#cardList > #user_${data.userID}`).length === 0
        && $http.get(`/user/card/${data.userID}`)
            .then(card => { $(`#cardList`).append(card) })

})
wsOnMsg('observerLeave', (data) => {
    //  console.log('$(`#tryBuyBtn`) :>> ', $(`#tryBuyBtn`));
    $(`#cardList > #user_${data.userID}`).remove()

})

wsOnMsg('auctionFinished', () => {
    //  console.log('$(`#tryBuyBtn`) :>> ', $(`#tryBuyBtn`));
    $(`.card.right`).hide()
    $(`#tryBuyBtn`).parent().append(`
    <button class="dangerBtn" id="tryBuyBtn">
        Сделать ставку
    </button>
    `)
    $(`#tryBuyBtn`).remove()

})



// const tryBuy = function (id) {
window.tryBuy = function (id) {
    $http.post(`/auction/${id}/trybuy`)
        .then((data) => {
            if (data.success) {
                // alert("Ставка сделана");
            }
            else alert("Ставку сделать не получилось")
        })
}

window.editAuction = function (event, id) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    formParser(event.target)
        .then((data) =>
            $http.post(`/auction/edit/${id}`, data)
                .then((data) => {
                    if (data.success) {
                        alert("Аукцион отредоктирована");
                        auctionInfo.html(data.editedAuction)
                    }
                    else alert("Аункцион не удалось отредоктировать")

                })
        );
};

window.openAuctionForm = function (action, id) {
    $http.get(`/auction/form/${action}/${id}`).then(openModal)
}

// setTimeout(function () {



const timerStep = (i, time) => {
    $('.timer > h2').text(time - i);
    $('.circle_animation').css('stroke-dashoffset', initialOffset - ((i + 1) * (initialOffset / time)));
}
const runTimer = (time) => {
    let i = time
        ? fullTime - time
        : 0
    //  console.log("timer restarted");
    interval && clearInterval(interval);


    /* Need initial run as interval hasn't yet occured... */
    // circle.css('stroke-dashoffset', initialOffset - (1 * (initialOffset / time)));
    timerStep(i, fullTime)

    interval = setInterval(function () {
        if (i == fullTime) {
            interval && clearInterval(interval);
            return;
        }
        i++
        timerStep(i, fullTime)
    }, 1000);

}


// }, 0)