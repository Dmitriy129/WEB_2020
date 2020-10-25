// require("axios");
let instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    // Authorization: `${localStorage.userID}.${localStorage.accessToken}`,
  },
  // responseType: "json",
});
instance.interceptors.response.use(
  (response) => {
    //проверить на статус]
    // console.log(response);

    return response.data;
  },
  (error) => {
    debugger;

    throw error;
  }
);

window.$http = instance;
