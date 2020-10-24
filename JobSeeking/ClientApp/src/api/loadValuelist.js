import axiosClient from './axiosClient';
const LoadValueListApi = {
    get:(nameValuelist) =>{
        const url=`/ValueList?nameValuelist=${nameValuelist}`;
        return axiosClient.get(url);
    }
}
export default LoadValueListApi;