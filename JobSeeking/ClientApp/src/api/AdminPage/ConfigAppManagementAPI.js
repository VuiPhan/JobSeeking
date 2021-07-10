import axiosClient from "api/axiosClient";

const ConfigAppManagementAPI = {
    getManagerConfigApps: () => {
        const url = `/ConfigAppManagement/GetManagerConfigApps`;
        return axiosClient.get(url);
    },
    updateConfigApp: (data) => {
        const url = `/ConfigAppManagement/UpdateConfigApp`;
        return axiosClient.post(url,data);
    }
    
}
export default ConfigAppManagementAPI;
