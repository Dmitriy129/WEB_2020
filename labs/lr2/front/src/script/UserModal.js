var openUserModal = function (userID) {
  $http.get(`user/${userID}`).then((modalHTML) => {
    openModal(modalHTML);
  });
};
