import axiosClient from "api/axiosClient";
const RegisterCompanyApi = {
    post: (data) => {
        const url = `/RegisterCompany/`;
        console.log('data', data);
        return axiosClient.post(url,data);
    },
}
export default RegisterCompanyApi;