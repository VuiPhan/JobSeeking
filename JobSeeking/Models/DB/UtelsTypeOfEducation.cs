using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UtelsTypeOfEducation
    {
        public UtelsTypeOfEducation()
        {
            UteappAppEducations = new HashSet<UteappAppEducation>();
        }

        public int RecId { get; set; }
        public string TypeOfEducationId { get; set; }
        public string TypeOfEducationName { get; set; }
        public string TypeOfEducationName2 { get; set; }
        public string Notes { get; set; }

        public virtual ICollection<UteappAppEducation> UteappAppEducations { get; set; }
    }
}
