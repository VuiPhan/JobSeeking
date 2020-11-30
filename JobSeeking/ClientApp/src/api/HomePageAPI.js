import axiosClient from './axiosClient';
const LoadJobsApi = {
    getAll: (CompanyID,CandidateCode) => {
        if(CandidateCode){
            const url = `/Jobs/Get?CompanyID=${CompanyID}&CandidateCode=${CandidateCode}`;
            return axiosClient.get(url);
        }
        else{
            const url = `/Jobs/Get?CompanyID=${CompanyID}`;
            return axiosClient.get(url);
        }
    },
}
export default LoadJobsApi;