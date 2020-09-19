import axiosClient from './axiosClient';
const LoadQuestionApi = {
    getAll: (param) =>{
        const url='/Values';
        return axiosClient.get(url,{param});
    },
    get:(id) =>{
        const url=`/Vocabulary/${id}`;
        return axiosClient.get(url);
    },
    post:(data) =>{
        const url=`/Values/`;
        console.log('data',data);
        return axiosClient.post(url,JSON.stringify(data));
    },
    GetDataFromFilter:(params) =>{
        const url=`/Vocabulary/`;
        // return axiosClient.get(url,JSON.stringify(data));
        return axiosClient.post(url,JSON.stringify(params));
      
    }
}
export default LoadQuestionApi;