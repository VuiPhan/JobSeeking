import axiosClient from "api/axiosClient";

const PublishedRecruitmentAPI = {
    post: (data) => {
        const url = `/PublishedRecuit/Post`;
        return axiosClient.post(url,data);
    },
}
export default PublishedRecruitmentAPI;
