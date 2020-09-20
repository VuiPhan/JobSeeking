using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UtelsMaritalStatus
    {
        public UtelsMaritalStatus()
        {
            UteappApplicant = new HashSet<UteappApplicant>();
        }

        public int RecId { get; set; }
        public string MaritalStatusId { get; set; }
        public string MaritalStatusName { get; set; }
        public string MaritalStatusName2 { get; set; }

        public virtual ICollection<UteappApplicant> UteappApplicant { get; set; }
    }
}
