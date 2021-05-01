import axiosClient from "api/axiosClient";

const TemplateEmailAPI = {
    post: (data) => {
        const url = `/TemplateEmail/UpdateTemplateEmail`;
        return axiosClient.post(url,data);
    },
    getTemplateEmail: () => {
        const url = `/TemplateEmail/GetTemplateEmailOfCompany`;
        return axiosClient.get(url);
    }
}
export default TemplateEmailAPI;
