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
    getByRecruiter: (data,JobID) => {
        const url = `/Seeker/GetViewSeekerBy?CandidateCode=${data}&JobID=${JobID}`;
        return axiosClient.get(url);
    },
    downloadCV: () => {
        const url = `/Download`;
        return axiosClient.get(url);
    },
    submitCV: (data) => {
        debugger;
        const url = `/UploadAndDownload/UploadCV`;
        return axiosClient.post(url,data);
    },
}
export default SeekerAPI;
