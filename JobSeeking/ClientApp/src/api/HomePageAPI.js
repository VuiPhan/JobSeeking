import axiosClient from './axiosClient';
const LoadJobsApi = {
    getAll: (param) => {
        const url = `/Jobs/Get?CompanyID=${param}`;
        return axiosClient.get(url);
    },
}
export default LoadJobsApi;