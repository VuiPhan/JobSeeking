import axiosClient from './axiosClient';
const LoadValueListApi = {
    get:(nameValuelist) =>{
        const url=`/ValueList?nameValuelist=${nameValuelist}`;
        return axiosClient.get(url);
    },
    getCombobox:(nameCombobox) =>{
        const url=`/ValueList/GetCombobox?nameCombobox=${nameCombobox}`;
        return axiosClient.get(url);
    }
}
export default LoadValueListApi;