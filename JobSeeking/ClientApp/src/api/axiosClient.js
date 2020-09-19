// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJWdWlQaGFuIiwiZW1haWwiOiIxMjMgSG_DoG5nIERp4buHdSAyIiwianRpIjoiY2UwMTFjYjYtOWIzZi00ZGY5LWI2MjMtOGQ4MGE4MzM4NjU0IiwiZXhwIjoxNTk5OTc4OTY5LCJpc3MiOiJhc2hwcm9naGVscC5jb20iLCJhdWQiOiJhc2hwcm9naGVscC5jb20ifQ.PL93e5SlAoEyBGeYIFPMUZJW3u1zmXqzvOB7Zce2ZMs"
const token =localStorage.getItem('token');
const axiosClient = axios.create({
// baseURL: 'http://localhost:55471/api',
baseURL: 'https://localhost:44398/api',
headers: {
'content-type': 'application/json',
// 'Authorization': `token ${access_token}`
Authorization:`Bearer ${token}`
},
paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
// Handle token here ...
return config;
})

axiosClient.interceptors.response.use((response) => {
if (response && response.data) {
return response.data;
}
return response;
}, (error) => {
// Handle errors
throw error;
});
export default axiosClient;