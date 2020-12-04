import axios from 'axios'
import { _localStorage } from './localStorage'
axios.interceptors.response.use(
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




// We use an IIFE to encapsulate our provider
export const http = (() => {
    function withDefaultHeaders(config, token) {
        return {
            "baseURL": "http://localhost:3001/",
            ...config,
            headers: {
                ...config?.headers || {},
                "Content-Type": "application/json",
                'Authorization': token
            }
        }
    }

    return {
        request(config) {
            const user = _localStorage.get('user')
            const { id, accessToken } = user
            const token = id + "#" + accessToken
            return axios(withDefaultHeaders(config, token))
        },
        get(url, config) {
            debugger
            const user = _localStorage.get('user')
            const { id, accessToken } = user
            const token = id + "#" + accessToken
            return axios.get(url, withDefaultHeaders(config, token))
        },
        post(url, data, config) {
            const user = _localStorage.get('user')
            const { id, accessToken } = user
            const token = id + "#" + accessToken
            return axios.post(url, data, withDefaultHeaders(config, token))
        },
    }
})()

export default http
