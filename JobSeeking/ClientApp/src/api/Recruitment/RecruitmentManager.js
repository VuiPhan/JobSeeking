import axiosClient from "api/axiosClient";

const RecruitmentManagerAPI = {
    AddUpdateRoundInterview: (data) => {
        const url = `/RecruitmentManagement/AddUpdateRoundInterview`;
        return axiosClient.post(url,data);
    },
    GetRoundRecruit: (JobID) => {
        const url = `/RecruitmentManagement/GetRoundRecruit?JobID=${JobID}`;
        return axiosClient.get(url);
    },
    IgnoreCandidates: (JobID,CandidateCode) => {
        const url = `/RecruitmentManagement/IgnoreCandidates?JobID=${JobID}&CandidateCode=${CandidateCode}`;
        return axiosClient.post(url);
    }
}
export default RecruitmentManagerAPI;
