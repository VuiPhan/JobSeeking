import axiosClient from './axiosClient';
const LoadSheduleList = {
    getAll: () =>{
        const url='/Values';
        return axiosClient.get(url);
    },
    get:(id) =>{
        const url=`/SheduleLearn/${id}`;
        return axiosClient.get(url);
    },
    post:(data) =>{
        const url=`/SheduleLearn/`;
        console.log('data',data);
        return axiosClient.post(url,JSON.stringify(data));
    }
}
export default LoadSheduleList;