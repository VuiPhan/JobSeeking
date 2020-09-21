using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UtelsAcademicLevel
    {
        public UtelsAcademicLevel()
        {
            UteappApplicants = new HashSet<UteappApplicant>();
        }

        public int RecId { get; set; }
        public string AcademicLevelId { get; set; }
        public string AcademicLevelName { get; set; }
        public string AcademicLevelName2 { get; set; }

        public virtual ICollection<UteappApplicant> UteappApplicants { get; set; }
    }
}
