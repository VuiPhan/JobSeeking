import axiosClient from "api/axiosClient";

const CompanyAPI = {
    get: (data) => {
        const url = `/Company/GetCompanyByID?CompanyID=${data}`;
        return axiosClient.get(url,data);
    },
    getListCompanyTop: () => {
        const url = `/Common/GetListCompanyTop`;
        return axiosClient.get(url);
    },
    getReview: (data) => {
        const url = `/Company/GetReviewCompany?CompanyID=${data}`;
        return axiosClient.get(url,data);
    },
    addReview: (data) => {
        const url = `/Company/PostReview/`;
        return axiosClient.post(url,data);
    },
}
export default CompanyAPI;
