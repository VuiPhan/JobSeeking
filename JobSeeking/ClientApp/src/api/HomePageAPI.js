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
    getListJobForCandidate30Days: () => {
        const url = `/Jobs/GetListJobForCandidate30Days`;
        return axiosClient.get(url);
    },
    getInfoToShowTimeline: () => {
        const url = `/Seeker/GetIsShowTimeline`;
        return axiosClient.get(url);
    },
    getAllForSearch: (JobSkillIDs,JobTitleIDs,LocationValue) => {
        const url = `/Jobs/GetJobForSearch?JobSkillIDs=${JobSkillIDs}&JobTitleIDs=${JobTitleIDs}&LocationValue=${LocationValue}`;
        return axiosClient.get(url);
    },
    getJobForApplyOfCandidate: () => {
        const url = `/Jobs/GetJobForApplyOfCandidate`;
        return axiosClient.get(url);
    },
    getJobForSearchKeyword: (value) => {
        const url = `/Jobs/GetJobForSearchKeyword?KeyWord=${value}`;
        return axiosClient.get(url);
    }
}
export default LoadJobsApi;