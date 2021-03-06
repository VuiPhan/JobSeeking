import axiosClient from "api/axiosClient";

const TemplateEmail_AdminAPI = {
    getAllTemplateEmail: () => {
        const url = `/TemplateEmailAdmin/GetAll_TemplateEmailAdmin`;
        return axiosClient.get(url);
    },
    updateTemplateEmailAdmin: (data) => {
        const url = `/TemplateEmailAdmin/UpdateTemplateEmail_Admin`;
        return axiosClient.post(url,data);
    },
}
export default TemplateEmail_AdminAPI;
