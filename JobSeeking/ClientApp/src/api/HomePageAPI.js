import axiosClient from './axiosClient';
const LoadJobsApi = {
    getAll: (CompanyID, CandidateCode, OwnCompany,IsReletive) => {
        if (CandidateCode) {
            const url = `/Jobs/Get?CompanyID=${CompanyID}&CandidateCode=${CandidateCode}&IsReletive=${IsReletive}`;
            return axiosClient.get(url);
        }
        else {
            const url = `/Jobs/Get?CompanyID=${CompanyID}&IsOwnCompany=${OwnCompany}&IsReletive=${IsReletive}`;
            return axiosClient.get(url);
        }
    },
    getAllForSearch: (JobSkillIDs,JobTitleIDs,LocationValue) => {
        const url = `/Jobs/GetJobForSearch?JobSkillIDs=${JobSkillIDs}&JobTitleIDs=${JobTitleIDs}&LocationValue=${LocationValue}`;
        return axiosClient.get(url);
    },
    getJobForApplyOfCandidate: () => {
        const url = `/Jobs/GetJobForApplyOfCandidate`;
        return axiosClient.get(url);
    },
}
export default LoadJobsApi;