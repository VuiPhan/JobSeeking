import axiosClient from '../axiosClient';
const CommonAPI = {
    get:(CompanyID,IsCompany) =>{
        const url=`/Common/Get?CompanyID=${CompanyID}&IsCompany=${IsCompany}`;
        return axiosClient.get(url);
    },
    getListSearch:() =>{
        const url=`/Common/ListSearch`;
        return axiosClient.get(url);
    }
}
export default CommonAPI;