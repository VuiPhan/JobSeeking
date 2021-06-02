using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobSeeking.Common
{
    public class RecruitmentPage
    {
    }
    public class RoundInterview
    {
        public int? RecID { get; set; }
        public int  JobID { get; set; }
        public string RoundName { get; set; }
        public DateTime DateInterview { get; set; }
        public string ContentInterview { get; set; }
        public int RoundInterviewNumber { get; set; }
    }
    public class CandidateOfRoundInterview
    {
        public int? JobID { get; set; }
        public int? RoundInterview { get; set; }
        public string RoundName { get; set; }

        public int? CandidateCode { get; set; }
        public string FullName { get; set; }
        public string DateInterview { get; set; }
        public string Descriptions { get; set; }
        public int? Result { get; set; }
        public int? RecID { get; set; }
        public int? Key { get; set; }

    }
    public class Candidate
    {
        public int? CandidateCode { get; set; }
        public string FullName { get; set; }
    }
    public class NumberViewDashboardCard
    {
        public int? NumCandidate { get; set; }
        public int? NumRecruiter { get; set; }
        public int? CandidateElect { get; set; }
        public int? AppPotential { get; set; }
        
    }
    public class Admin_InfomationCompany
    {
        public int? CompanyID { get; set; }
        public int? Key { get; set; }
        public string CompanyName { get; set; }
        public string CompanyType_Name { get; set; }
        public string JoinDate_String { get; set; }
        public int StatusAccount { get; set; }
    }
    public class ManagerCategories
    {
        public int CategoryCode { get; set; }
        public int Key { get; set; }
        public string CategoryName { get; set; }
        public bool IsLock { get; set; }
        

    }
    public class NumberViewDashboardChart_Job
    {
        public string YYYYMM { get; set; }
        public int? NumberJob { get; set; }

    }
    public class NumberViewDashboardChart_KyNang
    {
        public int? NumberJob { get; set; }
        public string SkillName { get; set; }

    }
    public class NumberViewDashboardChart_NhaTuyenDungAndUngVien
    {
        public int? Type { get; set; }
        public string YYYYMM { get; set; }
        public int? SL { get; set; }

    }
    public class CandidatePotential
    {
        public int? RecID { get; set; }
        public int CandidateCode { get; set; }
        public string FullName { get; set; }
        public string TitleJob { get; set; }
        public string PathAvatar { get; set; }
    }
    public class TemplateOfEmail
    {
        public int? RecID { get; set; }
        public int TemplateID { get; set; }
        public string Subject { get; set; }
        public string ContentOfEmail { get; set; }
        public string SuggestSubject { get; set; }
        public string SuggestContentEmail { get; set; }
        
    }
    public class TemplateOfEmail_Admin
    {
        public int TemplateID { get; set; }
        public string SuggestSubject { get; set; }
        public string SuggestContentEmail { get; set; }

    }
    public class Form_CategoryAdmin
        {
            public int? CategoryCode { get; set; }
            public string CategoryName { get; set; }
            public int? TypeCategory { get; set; }
    }

    }
