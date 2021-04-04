import axiosClient from "api/axiosClient";

const RecruitmentProfileAPI = {
    post: (JobID,CandidateCode) => {
        const url = `/RecruitmentProfile/AddCandidateToInterview?JobID=${JobID}&CandidateCode=${CandidateCode}`;
        return axiosClient.post(url);
    },
    AddPotentialCandidates: (CandidateCode) => {
        const url = `/RecruitmentProfile/PotentialCandidates?CandidateCode=${CandidateCode}`;
        return axiosClient.post(url);
    },
    IgnoreCandidates: (JobID,CandidateCode) => {
        const url = `/RecruitmentProfile/IgnoreCandidates?JobID=${JobID}&CandidateCode=${CandidateCode}`;
        return axiosClient.post(url);
    }
}
export default RecruitmentProfileAPI;
