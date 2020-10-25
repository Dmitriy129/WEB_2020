var closeModal = function () {
  let modal = document.getElementById("modalWindow");
  modal.parentNode.removeChild(modal);
};

var openModal = function (modalHTML) {
  document.body.innerHTML += modalHTML;
};
