using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UteappWork
    {
        public int RecId { get; set; }
        public int CandidateCode { get; set; }
        public int UserId { get; set; }
        public int JobId { get; set; }
        public int Notes { get; set; }
        public bool? IsEffect { get; set; }

        public virtual UteappAppEducation CandidateCodeNavigation { get; set; }
        public virtual UteappAccount User { get; set; }
    }
}
