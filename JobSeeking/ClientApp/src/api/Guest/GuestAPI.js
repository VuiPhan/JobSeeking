import axiosClient from "api/axiosClient";

const GuestAPI = {
    forgetPassword: (loginAccount) => {
        const url = `/Guest/ForgetPassword?loginAccount=${loginAccount}`;
        return axiosClient.get(url);
    },
    updatePassword: (loginAccount,otp,pass) => {
        const url = `/Guest/UpdatePassword?loginAccount=${loginAccount}&otp=${otp}&pass=${pass}`;
        return axiosClient.get(url);
    },
}
export default GuestAPI;
