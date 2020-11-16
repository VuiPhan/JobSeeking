using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UteworkJob
    {
        public int JobId { get; set; }
        public int CompanyId { get; set; }
        public string ReasonsToJoin { get; set; }
        public string JobsTitle { get; set; }
        public string JobDescriptions { get; set; }
        public string JobRequirements { get; set; }
        public string LoveWorkingHere { get; set; }
        public DateTime? PostingDate { get; set; }
        public string Strengths { get; set; }
        public string PriorityDegree { get; set; }
        public double? SalaryFrom { get; set; }
        public double? SalaryTo { get; set; }
        public string WorkLocation { get; set; }
        public string Otmode { get; set; }
        public string ImageJob { get; set; }

        public virtual UtecomCompany Company { get; set; }
    }
}
