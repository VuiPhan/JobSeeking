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
    getListCandidate: (data) => {
        const url = `/Common/GetListCandidateApply?JobID=${data}`;
        return axiosClient.get(url,data);
    },
    postApply: (data) => {
        const url = `/Jobs/ApplyJob?JobID=${data}`;
        return axiosClient.post(url,data);
    },
    countJob: () => {
        const url = `/Jobs/CountJob`;
        return axiosClient.get(url);
    },

}
export default JobsApi;
