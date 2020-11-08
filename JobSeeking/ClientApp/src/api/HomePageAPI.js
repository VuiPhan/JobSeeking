import axiosClient from './axiosClient';
const LoadJobsApi = {
    getAll: (param) => {
        debugger;
        const url = `/Jobs/Get?CompanyID=${param}`;
        return axiosClient.get(url);
    },
}
export default LoadJobsApi;