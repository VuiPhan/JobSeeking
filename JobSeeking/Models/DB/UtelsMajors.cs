using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UtelsMajors
    {
        public UtelsMajors()
        {
            UteappAppEducation = new HashSet<UteappAppEducation>();
        }

        public int RecId { get; set; }
        public string MajorsId { get; set; }
        public string MajorsName { get; set; }
        public string MajorsName2 { get; set; }
        public string Notes { get; set; }

        public virtual ICollection<UteappAppEducation> UteappAppEducation { get; set; }
    }
}
