import axiosClient from "api/axiosClient";

const RecruitmentManagerAPI = {
    AddUpdateRoundInterview: (data) => {
        const url = `/RecruitmentManagement/AddUpdateRoundInterview`;
        return axiosClient.post(url,data);
    },
    GetRoundRecruit: (JobID) => {
        if(JobID){
            const url = `/RecruitmentManagement/GetRoundRecruit?JobID=${JobID}`;
            return axiosClient.get(url);
        }
        
    },
    GetCandidateOfRoundRecruit: (JobID) => {
        if (JobID) {
            const url = `/RecruitmentManagement/GetCandidateOfRoundRecruit?JobID=${JobID}`;
            return axiosClient.get(url);
        }
    },
    UpdateResultOfCandidate: (data) => {
        const url = `/RecruitmentManagement/UpdateResultOfCandidate`;
        return axiosClient.post(url,data);
    },
    SendNotificationToApplicant: (JobID,RoundInterview) => {
        const url = `/RecruitmentManagement/SendNotificationToApplicant?JobID=${JobID}&RoundInterview=${RoundInterview}`;
        return axiosClient.post(url);
    },
    GetCandidatePotential: () => {
        const url = `/RecruitmentManagement/GetCandidatePotential`;
        return axiosClient.get(url);
    },
    
}
export default RecruitmentManagerAPI;
