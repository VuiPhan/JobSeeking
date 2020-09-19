import axiosClient from './axiosClient';
const VocabularyApi = {
    getAll: (param) =>{
        const url='/Values';
        return axiosClient.get(url,{param});
    },
    get:(id) =>{
        const url=`/Values/${id}`;
        return axiosClient.get(url);
    },
    post:(data) =>{
        const url=`/Values/`;
        console.log('data',data);
        return axiosClient.post(url,JSON.stringify(data));
    }
}
export default VocabularyApi;