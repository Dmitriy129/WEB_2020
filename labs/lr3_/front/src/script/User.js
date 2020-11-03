// import $ from "jQuery"
// import { formParser } from './Form';
const cardList = $('#cardList')

// const createPicture = function (event) {
window.createPicture = function (event) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    formParser(event.target)
        .then((data) =>
            $http.put("/picture", data)
                .then((data) => {
                    if (data.success) {
                        //  console.log(data.newPicture)
                        cardList.append($(data.newPicture))
                    }
                    else alert("Картину не удалось создать")
                })
        );
};

window.upMoney = function (event, id) {
    $http.post(`/user/money/${id}`, {
        money: parseInt($("#howMuchMoneyUp")[0].value) || 0
    })
        .then((data) => {
            if (data.success) {
                alert("Баланс пополнен")
                $("#balance").html(`Баланс: ${data.balance}`)
            }
            else
                alert("Не удалось пополнить баланс")
        })
}

