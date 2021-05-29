import axiosClient from "api/axiosClient";

const DashboardPageAPI = {
    getViewCardStatis: () => {
        const url = `/Dashboard/Statistics_ViewDashboardCard`;
        return axiosClient.get(url);
    },
    getViewCardStatis_Chart: (fromTime,toTime) => {
        const url = `/Dashboard/Statistics_ViewDashboard_Chart?fromTime=${fromTime}&toTime=${toTime}`;
        return axiosClient.get(url);
    },
    getViewCardStatis_Chart_Kynang: (fromTime,toTime) => {
        const url = `/Dashboard/Statistics_ViewDashboard_Chart_KyNang?fromTime=${fromTime}&toTime=${toTime}`;
        return axiosClient.get(url);
    },
    getViewCardStatis_Chart_ChucDanh: (fromTime,toTime) => {
        const url = `/Dashboard/Statistics_ViewDashboard_Chart_ChucDanh?fromTime=${fromTime}&toTime=${toTime}`;
        return axiosClient.get(url);
    },
    
    // AddPotentialCandidates: (CandidateCode) => {
    //     const url = `/RecruitmentProfile/PotentialCandidates?CandidateCode=${CandidateCode}`;
    //     return axiosClient.post(url);
    // },
    // IgnoreCandidates: (JobID,CandidateCode) => {
    //     const url = `/RecruitmentProfile/IgnoreCandidates?JobID=${JobID}&CandidateCode=${CandidateCode}`;
    //     return axiosClient.post(url);
    // }
}
export default DashboardPageAPI;
