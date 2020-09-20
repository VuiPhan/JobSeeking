using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UtelsEducationalLevel
    {
        public UtelsEducationalLevel()
        {
            UteappApplicant = new HashSet<UteappApplicant>();
        }

        public int RecId { get; set; }
        public string EducationalLevelId { get; set; }
        public string EducationalLevelName { get; set; }
        public string EducationalLevelName2 { get; set; }

        public virtual ICollection<UteappApplicant> UteappApplicant { get; set; }
    }
}
