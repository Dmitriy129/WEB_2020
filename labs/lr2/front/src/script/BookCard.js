var actionBook = function (action) {
  $http
    .post(window.location.pathname, { action })
    .then((data) => window.location.reload());
  // $http.post(window.location.pathname, { action }).then(updateBookInfo);
};

var openFormModal = function (id) {
  $http.get(`/bookForm/edit/${id}`).then((modalHTML) => {
    openModal(modalHTML);
  });
};

// var editBookData = function (event, id) {
//   event.preventDefault ? event.preventDefault() : (event.returnValue = false);

//   formParser((data) =>
//     $http
//       .post(`/book/${id}`, {
//         action: "edit",
//         data,
//       })
//       .then(updateBookInfo)
//   );
// };

var updateBookInfo = function (bookInfoHTML) {
  document.getElementById("bookInfo").innerHTML = bookInfoHTML;
};
