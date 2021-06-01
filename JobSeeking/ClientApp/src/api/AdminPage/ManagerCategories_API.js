import axiosClient from "api/axiosClient";

const ManagerCategories_API = {
    getManagerCategories: (type) => {
        const url = `/ManagerCategories/GetManagerCategories?typeCategories=${type}`;
        return axiosClient.get(url);
    },
    updateTemplateEmailAdmin: (data) => {
        const url = `/TemplateEmailAdmin/UpdateTemplateEmail_Admin`;
        return axiosClient.post(url,data);
    },
}
export default ManagerCategories_API;
