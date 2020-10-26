using System;

namespace JobSeeking.Models.DB
{
    public partial class UteappAppWorkProgress
    {
        public int RecId { get; set; }
        public string RecruitmentAgencyId { get; set; }
        public string CandidateCode { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string JobName { get; set; }
        public bool? IsWorking { get; set; }

        public virtual UteappApplicant CandidateCodeNavigation { get; set; }
    }
}
