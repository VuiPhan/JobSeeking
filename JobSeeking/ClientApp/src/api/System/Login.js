import axiosClient from '../axiosClient';
const LoginApi = {
    post:() =>{
        const url=`/Login/post`;
        return axiosClient.post(url);
    },
    get:async (data) =>{
        // debugger;
        const url=`/Login?userName=${data.Email}&pass=${data.Password}`;
        let response= await axiosClient.get(url,JSON.stringify(data));
        console.log('responseresponse',response);
        if(response){
            console.log('responseresponse',response);
            localStorage.setItem('token', response.token);
            var data = parseJwt(response.token);
            debugger;
            localStorage.setItem('UserLogin', JSON.stringify(data));
        }
        //var response = data;
        return data;
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