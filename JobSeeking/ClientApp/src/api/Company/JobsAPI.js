import axiosClient from "api/axiosClient";

const JobsApi = {
    get: (data) => {
        const url = `/Jobs/GetJobByID?jobid=${data}`;
        return axiosClient.get(url,data);
    },
    getListCandidate: (data) => {
        const url = `/Common/GetListCandidateApply?JobID=${data}`;
        return axiosClient.get(url,data);
    },
}
export default JobsApi;
