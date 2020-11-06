import axiosClient from "api/axiosClient";

const CompanyAPI = {
    get: (data) => {
        const url = `/Company/GetCompanyByID?CompanyID=${data}`;
        return axiosClient.get(url,data);
    },
}
export default CompanyAPI;
