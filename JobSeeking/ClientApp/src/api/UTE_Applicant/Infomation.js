import axiosClient from "../axiosClient";
const loadInfomation = {
    getAll: (param) =>{
        const url='/UTE_APP_Infomation';
        return axiosClient.get(url);
    },
    get:(id) =>{
        const url=`/UTE_APP_Infomation/${id}`;
        return axiosClient.get(url);
    },
    post:(data) =>{
       
    },
}
export default loadInfomation;