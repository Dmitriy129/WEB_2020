// import $ from "jQuery"
// import { formParser } from './Form';

const pictureInfo = $('#pictureInfo')

window.openPictureForm = function (id) {
    $http.get(`/picture/form/${id}`).then(openModal)
}

window.editPicture = function (event, id) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    formParser(event.target)
        .then((data) =>
            $http.post(`/picture/edit/${id}`, data)
                .then((data) => {
                    if (data.success) {
                        alert("Картина отредоктирована");
                        // //  console.log(data.editedPicture)
                        pictureInfo.html(data.editedPicture)
                    }
                    else alert("Картину не удалось отредоктировать")

                })
        );
};


window.delPicture = function (id) {
    $http.delete(`/picture/${id}`).then(({ success }) => success && (document.location.pathname = '/pictures/'))

}
window.openAuctionForm = function (action, id) {
    $http.get(`/auction/form/${action}/${id}`).then(openModal)
}
window.createAuction = function (event, id) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    formParser(event.target)
        .then((data) =>
            $http.put(`/auction`, { ...data, picture: id })
                .then((data) => {
                    if (data.success) {
                        // alert("Аукцион создан")
                        document.location = `/auction/${data.id}`
                    }
                    else alert("Аукцион не удалось создать")
                })
        );
};


