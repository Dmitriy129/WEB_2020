import axios from 'axios';
let instance = axios.create({
  "baseURL": "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
    // 'Access-Control-Allow-Origin': '*', // * или ваш домен
    // 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    // Authorization: `${localStorage.userID}.${localStorage.accessToken}`,
  },
  // responseType: "json",
});

instance.interceptors.response.use(
  (response) => {
    debugger
    //проверить на статус]
    console.log(response);
    return response.data;
  },
  (error) => {
    debugger
    console.warn(error);
    // alert(error.message)
    throw error;
  }
);

export default instance;
