var removeRow = function (id) {
  $http
    .post(`/booklist/${id}`, {
      action: "remove",
    })
    .then((tableHTML) => {
      updateTable(tableHTML);
    });
};

var addRow = function () {
  openFormModal("new");
};

var editRow = function (id) {
  openFormModal(`edit/${id}`);
};

var editBookData = function (event, id) {
  let data = {};
  event.preventDefault ? event.preventDefault() : (event.returnValue = false);
  Array.from(event.target).forEach((e) => e.name && (data[e.name] = e.value));
  if (!checkBookForm(data)) {
    alert("Заполните форму полностью");
    return;
  }
  $http
    .post(`/booklist/${id}`, {
      action: "edit",
      data,
    })
    .then((tableHTML) => {
      updateTable(tableHTML);
    });
};

var updateTable = function (tableHTML) {
  document.getElementById("tableBox").outerHTML = tableHTML;
};
var openFormModal = function (path) {
  $http.get(`/bookForm/${path}`).then((modalHTML) => {
    openModal(modalHTML);
  });
};

