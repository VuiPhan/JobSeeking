import axiosClient from "api/axiosClient";

const TemplateEmail_AdminAPI = {
    getAllTemplateEmail: () => {
        const url = `/TemplateEmailAdmin/GetAll_TemplateEmailAdmin`;
        return axiosClient.get(url);
    },
    // getViewCardStatis_Chart: (fromTime,toTime) => {
    //     const url = `/Dashboard/Statistics_ViewDashboard_Chart?fromTime=${fromTime}&toTime=${toTime}`;
    //     return axiosClient.get(url);
    // },
}
export default TemplateEmail_AdminAPI;
