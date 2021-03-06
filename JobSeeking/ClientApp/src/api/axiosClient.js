// api/axiosClient.js
import axios from 'axios';
import ConstCommon from 'common/ConstInApp';
import queryString from 'query-string';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
var token = localStorage.getItem('token');

//https://localhost:44351/
//https://jobseeking.conveyor.cloud/
const axiosClient = axios.create({
    baseURL: ConstCommon.LinkConnectAPILocal,
    headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
    },
    paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
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