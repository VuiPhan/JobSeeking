import axiosClient from "api/axiosClient";

const CertificateAPI = {
    post: (data) => {
        const url = `/Seeker/AddCertificate`;
        return axiosClient.post(url,data);
    },
    get: (data) => {
        if(data){
            const url = `/Seeker/GetListCertificate?CandidateCode=${data}`;
            return axiosClient.get(url);
        }
        const url = `/Seeker/GetListCertificate`;
        return axiosClient.get(url);
    },
    deleteEducation: (RecID) => {
        const url = `/Seeker/DeleteCertificate?RecID=${RecID}`;
        return axiosClient.post(url);
    }
}
export default CertificateAPI;
