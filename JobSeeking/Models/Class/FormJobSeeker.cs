using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobSeeking.Models.Class
{
    public class FormJobSeeker
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string RePassword { get; set; }
        public string Email { get; set; }
        public DateTime BirthDay { get; set; }
        public string BirthDayString { get; set; }
        public string PhoneNumber { get; set; }
        public int Gender { get; set; }
        public int AcademicLevel { get; set; }

        public string Facebook { get; set; }
        public string Linkin { get; set; }
        public string Github { get; set; }
        public string SelfIntroduce { get; set; }
        public string PathAvatar { get; set; }
        public string TitleJob { get; set; }
        public string AliasesName { get; set; }
        public bool IsAcceptWork { get; set; }


    }
    public class FormJobSeekerAddUpdate
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public DateTime BirthDay { get; set; }
        public string BirthDayString { get; set; }
        public string PhoneNumber { get; set; }
        public int Gender { get; set; }
        public int AcademicLevel { get; set; }

        public string Facebook { get; set; }
        public string Linkin { get; set; }
        public string Github { get; set; }
        public string SelfIntroduce { get; set; }
        public string PathAvatar { get; set; }
        public string TitleJob { get; set; }
        public string AliasesName { get; set; }
        public string ImageName { get; set; }
        public string CandidateCode { get; set; }
        public IFormFile ImageFile { get; set; }
        public bool IsAcceptWork { get; set; }

    }
    public class SubmitCVSeeker
    {
        public string CVName { get; set; }
        public IFormFile CVFile { get; set; }
    }
    //public class CandidateClick
    //{
    //    public int CandidateCode { get; set; }
    //    public int JobID { get; set; }
    //}

    public class FormHeaderCompany
    {
        public int CompanyID { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public int CompanyType { get; set; }
        public string ImageLogo { get; set; }
        public string Image1 { get; set; }
        public string Image3 { get; set; }
        public string Image2 { get; set; }
        public string TimeWorking { get; set; }
        
    }
    public class WorkInfo
    {
        public int CandidateCode { get; set; }
        public string JobSkillIDs { get; set; }
        public string JobTitleIDs { get; set; }
        public string JobLocations { get; set; }

    }
    public class WorkProcess
    {
        public string CandidateCode { get; set; }
        public DateTime FromTime { get; set; }
        public DateTime ToTime { get; set; }
        public string JobTitle { get; set; }
        public int StaffType { get; set; }
        public string CompanyName { get; set; }
        public int RecID { get; set; }
        public string Description { get; set; }
    }
    public class Certificate
    {
        public string CandidateCode { get; set; }
        public DateTime FromTime { get; set; }
        public DateTime ToTime { get; set; }
        public string CertificateName { get; set; }
        public int CertificateType { get; set; }
        public string DegreePlace { get; set; }
        public int RecID { get; set; }
        public string Descriptions { get; set; }
    }
    public class Education
    {
        public string CandidateCode { get; set; }
        public DateTime FromTime { get; set; }
        public DateTime ToTime { get; set; }
        public int DegreeTraining { get; set; }
        public string NameSchool { get; set; }
        public int RecID { get; set; }
        public string Descriptions { get; set; }
    }
}
