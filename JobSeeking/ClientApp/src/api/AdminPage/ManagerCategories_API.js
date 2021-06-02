import axiosClient from "api/axiosClient";

const ManagerCategories_API = {
    getManagerCategories: (type) => {
        const url = `/ManagerCategories/GetManagerCategories?typeCategories=${type}`;
        return axiosClient.get(url);
    },
    updateCategory: (data) => {
        const url = `/ManagerCategories/UpdateCategory`;
        return axiosClient.post(url,data);
    },
    lockCategory: (CategoryCode,TypeCategory) => {
        const url = `/ManagerCategories/LockCategory_Admin?CategoryCode=${CategoryCode}&TypeCategory=${TypeCategory}`;
        return axiosClient.post(url);
    },
}
export default ManagerCategories_API;
