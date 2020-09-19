import axiosClient from "../axiosClient";
const loadGender = {
    getAll: (param) =>{
        const url='/UTELS_Genders';
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
    },
}
export default loadGender;