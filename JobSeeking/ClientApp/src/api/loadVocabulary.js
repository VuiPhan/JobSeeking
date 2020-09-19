import axiosClient from './axiosClient';
const LoadVocabulary = {
    getAll: () =>{
        const url='/Values';
        return axiosClient.get(url);
    },
    get:(id) =>{
        const url=`/Vocabulary/${id}`;
        return axiosClient.get(url);
    },
    post:(data) =>{
        const url=`/Values/`;
        console.log('data',data);
        return axiosClient.post(url,JSON.stringify(data));
    }
}
export default LoadVocabulary;