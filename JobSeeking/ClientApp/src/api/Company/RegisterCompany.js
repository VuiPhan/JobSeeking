import axiosClient from "api/axiosClient";
const RegisterCompanyApi = {
    post: (data) => {
        const url = `/RegisterCompany/`;
        return axiosClient.post(url,data);
    },
}
export default RegisterCompanyApi;