import axiosClient from '../axiosClient';
const LoadComboboxApi = {
    get:(nameCombobox) =>{
        const url=`/Combobox?nameCombobox=${nameCombobox}`;
        return axiosClient.get(url);
    }
}
export default LoadComboboxApi;