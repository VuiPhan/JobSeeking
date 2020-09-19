import axiosClient from '../axiosClient';
const LoginApi = {
    post:() =>{
        const url=`/Login/post`;
        return axiosClient.post(url);
    },
    get:async (data) =>{
        const url=`/Login?userName=${data.userName}&pass=${data.pass}`;
        let response= await axiosClient.get(url,JSON.stringify(data))
        if(response){
            localStorage.setItem('token', response.token);
            var data = parseJwt(response.token);
            localStorage.setItem('UserLogin', JSON.stringify(data));
        }
        return response;
    }
}
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
export default LoginApi;