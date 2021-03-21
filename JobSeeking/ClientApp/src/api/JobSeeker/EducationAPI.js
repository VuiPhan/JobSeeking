import axiosClient from "api/axiosClient";

const EducationAPI = {
    post: (data) => {
        const url = `/Seeker/AddEducation`;
        return axiosClient.post(url,data);
    },
    get: (data) => {
        if(data){
            const url = `/Seeker/GetListEducation?CandidateCode=${data}`;
            return axiosClient.get(url);
        }
        const url = `/Seeker/GetListEducation`;
        return axiosClient.get(url);
    },
    deleteEducation: (RecID) => {
        const url = `/Seeker/DeleteEducation?RecID=${RecID}`;
        return axiosClient.post(url);
    }
}
export default EducationAPI;
