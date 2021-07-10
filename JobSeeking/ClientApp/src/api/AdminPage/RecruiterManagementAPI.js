import axiosClient from "api/axiosClient";

const RecruiterManagementAPI = {
    getInfomationCompany: () => {
        const url = `/RecruiterManagement/Get_InfomationCompany`;
        return axiosClient.get(url);
    },
    updateStatusOfAccount: (companyID,status) => {
        const url = `/RecruiterManagement/UpdateStatusOfAccount?companyID=${companyID}&status=${status}`;
        return axiosClient.post(url);
    },
    paymentCompany: (companyID,money) => {
        const url = `/RecruiterManagement/PayMoneyForCompany?companyID=${companyID}&money=${money}`;
        return axiosClient.post(url);
    },
    
}
export default RecruiterManagementAPI;
