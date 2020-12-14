using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobSeeking.Models.Class
{
    public class JobForm
    {
        public int JobID { get; set; }
        public string JobDescriptions { get; set; }
        public string JobRequirements { get; set; }
        public string ReasonsToJoin { get; set; }
        public string CompanyName { get; set; }
        public int CompanyID { get; set; }
        public string PostingDateString { get; set; }
        public string JobsTitle { get; set; }
        public string ImageJob { get; set; }
        public string JobAddress { get; set; }
        public string ImageLogo { get; set; }
        public int NumCandidate { get; set; }
        
    }
    public class ListCandidateApply
    {
        public int RecID { get; set; }
        public int CandidateCode { get; set; }
        public int JobID { get; set; }
        public string DateApply { get; set; }
        public string FullNameCandidate { get; set; }
        public string Major { get; set; }
        public string PathAvatar { get; set; }

    }
    public class JobPage
    {
        public int JobId { get; set; }
        public string JobDescriptions { get; set; }
        public string JobRequirements { get; set; }
        public string ReasonsToJoin { get; set; }
        public string PostingDate { get; set; }
        public string JobsTitle { get; set; }
        public string LoveWorkingHere { get; set; }
        public string CompanyName { get; set; }
        public int CompanyId { get; set; }
        public string ImageLogo { get; set; }
        public string TimeWorking { get; set; }
        public string CompanyAddress { get; set; }
        public string ScalePeople { get; set; }
        public string CompanyType { get; set; }
        public string OTMode { get; set; }
        public string Salary { get; set; }

    }
}
