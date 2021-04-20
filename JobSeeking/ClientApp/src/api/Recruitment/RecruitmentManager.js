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
    },
    UpdateResultOfCandidate: (data) => {
        const url = `/RecruitmentManagement/UpdateResultOfCandidate`;
        return axiosClient.post(url,data);
    },
    SendNotificationToApplicant: (JobID,RoundInterview) => {
        const url = `/RecruitmentManagement/SendNotificationToApplicant?JobID=${JobID}&RoundInterview=${RoundInterview}`;
        return axiosClient.post(url);
    },
}
export default RecruitmentManagerAPI;
