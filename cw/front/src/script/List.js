// import $ from "jQuery"

wsOnMsg('newCard', (data) => {
    //  console.log('newCard :>> ', data);
    $('#cardList').append(data.newCard)
})