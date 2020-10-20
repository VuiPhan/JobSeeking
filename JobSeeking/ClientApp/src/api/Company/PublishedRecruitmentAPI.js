import axiosClient from "api/axiosClient";

const PublishedRecruitmentAPI = {
    post: (data) => {
        debugger;
        const url = `/RegisterCompany/`;
        return axiosClient.post(url,data);
    },
}
export default PublishedRecruitmentAPI;
