import axiosClient from "api/axiosClient";

const CompanyAPI = {
    get: (data) => {
        const url = `/Company/GetCompanyByID?CompanyID=${data}`;
        return axiosClient.get(url,data);
    },
    getReview: (data) => {
        const url = `/Company/GetReviewCompany?CompanyID=${data}`;
        return axiosClient.get(url,data);
    },
    addReview: (data) => {
        debugger;
        const url = `/Company/PostReview/`;
        return axiosClient.post(url,data);
    },
}
export default CompanyAPI;
