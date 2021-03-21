import axiosClient from "api/axiosClient";

const WorkProcessAPI = {
    post: (data) => {
        const url = `/Seeker/AddWorkProcess`;
        return axiosClient.post(url,data);
    },
    get: (data) => {
        if(data){
            const url = `/Seeker/GetListWorkProcess?CandidateCode=${data}`;
            return axiosClient.get(url);
        }
        const url = `/Seeker/GetListWorkProcess`;
        return axiosClient.get(url);
    },
    deleteWorkProcess: (RecID) => {
        const url = `/Seeker/DeleteWorkProcess?RecID=${RecID}`;
        return axiosClient.post(url);
    },
    submitCV: (data) => {
        const url = `/UploadAndDownload/UploadCV`;
        return axiosClient.post(url,data);
    },
    getListCV: (data) => {
        const url = `/Seeker/GetListCV?CandidateCode=${data}`;
        return axiosClient.get(url);
    }
}
export default WorkProcessAPI;
