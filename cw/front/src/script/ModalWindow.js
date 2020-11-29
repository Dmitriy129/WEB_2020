// import $ from "jQuery"

window.closeModal = function () { $("#modalWindow").remove() };

window.openModal = function (modalHTML) { $("body").append($(modalHTML)) };
