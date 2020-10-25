using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UteworkJob
    {
        public int RecId { get; set; }
        public int JobId { get; set; }
        public int CompanyId { get; set; }
        public string ReasonsToJoin { get; set; }
        public string JobsTitle { get; set; }
        public string JobDescriptions { get; set; }
        public string JobRequirements { get; set; }
        public string LoveWorkingHere { get; set; }
        public DateTime? PostingDate { get; set; }
    }
}
