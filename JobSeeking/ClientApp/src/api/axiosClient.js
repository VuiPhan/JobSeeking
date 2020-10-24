// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
var token = localStorage.getItem('token');
console.log('tokentokentoken',token);
const axiosClient = axios.create({
    baseURL: 'https://localhost:44351/api/',
    headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
    },
    paramsSerializer: params => queryString.stringify(params),
});
// axiosClient.interceptors.request.use(async (config) => {
//     // Handle token here ...
//     config => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers['Authorization'] = 'Bearer ' + token;
//         }
//         // config.headers['Content-Type'] = 'application/json';
//         return config;
//     },
//     error => {
//         Promise.reject(error)
//     }
//     return config;
// })
axiosClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error)
    });

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    throw error;
});
export default axiosClient;