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
    }
    public class UpLoadCV
    {
        public int JobTitleID { get; set; }
        public string CVName { get; set; }
        public string Description { get; set; }
        public IFormFile CVFile { get; set; }
    }
    public class ListCVOfCandidate
    {
        public int RecID { get; set; }
        public int CandidateCode { get; set; }
        public int JobTitleID { get; set; }
        public string Description { get; set; }
        public string PathCV { get; set; }
        public string JobTitleName { get; set; }
    }
}
