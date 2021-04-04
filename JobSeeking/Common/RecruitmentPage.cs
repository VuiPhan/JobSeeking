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
        public int RecID { get; set; }
        public int  JobID { get; set; }
        public string RoundName { get; set; }
        public DateTime DateInterview { get; set; }
        public string ContentInterview { get; set; }
        public int RoundInterviewNumber { get; set; }
    }
    public class CandidateOfRoundInterview
    {
        public int JobID { get; set; }
        public int RoundInterview { get; set; }
        public string RoundName { get; set; }
        public int? CandidateCode { get; set; }
        public string FullName { get; set; }
    }
    public class Candidate
    {
        public int? CandidateCode { get; set; }
        public string FullName { get; set; }
    }
}
