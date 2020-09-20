using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UtelsFormsOfTraining
    {
        public UtelsFormsOfTraining()
        {
            UteappApplicant = new HashSet<UteappApplicant>();
        }

        public int RecId { get; set; }
        public string FormsOfTrainingId { get; set; }
        public string FormsOfTrainingName { get; set; }
        public byte? Ordinal { get; set; }

        public virtual ICollection<UteappApplicant> UteappApplicant { get; set; }
    }
}
