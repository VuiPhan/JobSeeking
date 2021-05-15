import axiosClient from "api/axiosClient";

const JobsApi = {
    get: (data) => {
        const url = `/Jobs/GetJobByID?jobid=${data}`;
        return axiosClient.get(url,data);
    },
    getForEdit: (data) => {
        const url = `/PublishedRecuit/GetForEdit?jobid=${data}`;
        return axiosClient.get(url);
    },
    getListCandidate: (data,IsSearch=false) => {
        const url = `/Common/GetListCandidateApply?JobID=${data}&IsSearch=${IsSearch}`;
        return axiosClient.get(url,data);
    },
    postApply: (data) => {
        const url = `/Jobs/ApplyJob?JobID=${data}`;
        return axiosClient.post(url,data);
    },
    postCancelApply: (data) => {
        const url = `/Jobs/CancelApplyJob?JobID=${data}`;
        return axiosClient.post(url,data);
    },
    countJob: () => {
        const url = `/Jobs/CountJob`;
        return axiosClient.get(url);
    },
    insertClick: (CandidateCode,JobID) => {
        const url = `/Seeker/AddClick?CandidateCode=${CandidateCode}&JobID=${JobID}`;
        return axiosClient.post(url);
    },
    GetApplicantForNotification: () => {
        const url = `/Jobs/GetApplicantForNotification`;
        return axiosClient.get(url);
    },
    UpdateViewProfileCandidate: (JobID,CandidateCode) => {
        const url = `/Jobs/UpdateViewProfileCandidate?JobID=${JobID}&CandidateCode=${CandidateCode}`;
        return axiosClient.get(url);
    },
}
export default JobsApi;
