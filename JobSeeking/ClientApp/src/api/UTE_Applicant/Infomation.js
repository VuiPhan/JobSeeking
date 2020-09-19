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
        console.log('dataapi',data);
        const url=`/UTE_APP_Infomation/`;
        // return axiosClient.post(url,JSON.stringify(data));
        var xxx = {x:3,y:4};
        return axiosClient.post(url,JSON.stringify(xxx));
    },
}
export default loadInfomation;