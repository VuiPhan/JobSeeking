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
    GetCandidateOfRoundRecruit: (JobID) => {
        const url = `/RecruitmentManagement/GetCandidateOfRoundRecruit?JobID=${JobID}`;
        return axiosClient.get(url);
    }
}
export default RecruitmentManagerAPI;
