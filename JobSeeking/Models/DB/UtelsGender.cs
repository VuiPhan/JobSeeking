using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UtelsGender
    {
        public UtelsGender()
        {
            UteappApplicants = new HashSet<UteappApplicant>();
        }

        public int RecId { get; set; }
        public string GenderId { get; set; }
        public string GenderName { get; set; }
        public string GenderName2 { get; set; }

        public virtual ICollection<UteappApplicant> UteappApplicants { get; set; }
    }
}
