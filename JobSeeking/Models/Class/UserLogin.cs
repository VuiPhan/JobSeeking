using Microsoft.AspNetCore.Http;

namespace JobSeeking.Models.Class
{
    public class UserLogin
    {
        public string UserName { get; set; }
        public string? Password { get; set; }
        public int UserID { get; set; }
        public string Roles { get; set; }
        public int? CompanyID { get; set; }
        public int? CandidateCode { get; set; }
        public string TypeStringError { get; set; }
    }
    public class UpLoadCV
    {
        public int RecID { get; set; }
        public int JobTitleID { get; set; }
        public string CVName { get; set; }
        public string Description { get; set; }
        public string PathCV { get; set; }
        public string OrdinalCVName { get; set; }
        public IFormFile CVFile { get; set; }
        public bool IsPublic { get; set; }
    }
    public class ListCVOfCandidate
    {
        public int RecID { get; set; }
        public int CandidateCode { get; set; }
        public int JobTitleID { get; set; }
        public string Description { get; set; }
        public string PathCV { get; set; }
        public string JobTitleName { get; set; }
        public string OrdinalCVName { get; set; }
        public bool IsPublic { get; set; }
    }
    public class ListWorkProcessOfCandidate
    {
        public int RecID { get; set; }
        public int CandidateCode { get; set; }
        public string TimeWorking { get; set; }
        public string JobTitle { get; set; }
        public string StaffType { get; set; }
        public string CompanyName { get; set; }
        public string Description { get; set; }
        public string BackgroundColor { get; set; }
        public string FromTime { get; set; }
        public string ToTime { get; set; }
        public System.Int16 StaffTypeNumber { get; set; }
    }
    public class ListCertificateOfCandidate
    {
        public int? RecID { get; set; }
        public int? CandidateCode { get; set; }
        public string TimeActive { get; set; }
        public string CertificateName { get; set; }
        public string DegreePlace { get; set; }
        public string Descriptions { get; set; }
        public string FromTime { get; set; }
        public string ToTime { get; set; }
        public System.Int16 CertificateType { get; set; }
        public string CertificateTypeName { get; set; }

        public string BackgroundColor { get; set; }

    }
    public class ListEducation
    {
        public int RecID { get; set; }
        public int CandidateCode { get; set; }
        public string TimeEducation { get; set; }
        public string NameSchool { get; set; }
        public int? DegreeTraining { get; set; }
        public string Descriptions { get; set; }
         public string TypeDegree { get; set; }
        public string FromTime { get; set; }
        public string ToTime { get; set; }
        public string BackgroundColor { get; set; }
        
    }
}
