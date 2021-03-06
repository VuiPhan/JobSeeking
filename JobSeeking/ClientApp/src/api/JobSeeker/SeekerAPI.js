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
        const url = `/UploadAndDownload/UploadCV`;
        return axiosClient.post(url,data);
    },
    getListCV: (data) => {
        const url = `/Seeker/GetListCV?CandidateCode=${data}`;
        return axiosClient.get(url);
    },
    deleteCV: (data) => {
        const url = `/UploadAndDownload/DeleteCV`;
        return axiosClient.post(url,data);
    },
    getWorkInfo: (data) => {
        const url = `/Seeker/GetWorkInfo?CandidateCode=${data}`;
        return axiosClient.get(url);
    },
    updateWorkInfo: (data) => {
        const url = `/Seeker/UpdateWorkInfo`;
        return axiosClient.post(url,data);
    },
    changePassword: (PasswordCurrent,PasswordNew) => {
        const url = `/Login/UpdatePassword?PasswordCurrent=${PasswordCurrent}&PasswordNew=${PasswordNew}`;
        return axiosClient.post(url);
    },
    applicantGetViewProfile: () => {
        const url = `/Seeker/ApplicantGetViewProfile`;
        return axiosClient.get(url);
    },
    UpdateStatiscalViewProfile: (CandidateCode) => {
        const url = `/Seeker/UpdateStatiscalViewProfile?CandidateCode=${CandidateCode}`;
        return axiosClient.post(url);
    },
    GetTimelineCandidate: () => {
        const url = `/Seeker/GetTimelineCandidate`;
        return axiosClient.get(url);
    },
    updateStatusViewTimeLine: (status) => {
        const url = `/Seeker/UpdateStatusViewTimeLine?status=${status}`;
        return axiosClient.post(url);
    },
}
export default SeekerAPI;
