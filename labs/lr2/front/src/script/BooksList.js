var formFilter = document.querySelector("form.filterConf");

var onChangeToogleFilter = function (event) {
  event.target.checked
    ? (formFilter.style.display = "unset")
    : (formFilter.style.display = "none") && sendConf({});
};
var submitFilter = function (event) {
  let data = {};
  event.preventDefault ? event.preventDefault() : (event.returnValue = false);
  Array.from(event.target).forEach(
    (e) =>
      e.name && (data[e.name] = e.type === "checkbox" ? e.checked : e.value)
  );

  sendConf(data);
};

var sendConf = function (conf) {
  $http
    .post(`/booklist`, {
      action: "filter",
      conf,
    })
    .then((tableHTML) => {
      updateTable(tableHTML);
    });
};
