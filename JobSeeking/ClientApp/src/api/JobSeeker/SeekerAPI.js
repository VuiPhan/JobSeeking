import axiosClient from "api/axiosClient";

const SeekerAPI = {
    post: (data) => {
        const url = `/Seeker/Post`;
        return axiosClient.post(url,data);
    },
    get: (data) => {
        const url = `/Seeker/Get?formJobSeeker=${data}`;
        return axiosClient.get(url);
    },
}
export default SeekerAPI;
