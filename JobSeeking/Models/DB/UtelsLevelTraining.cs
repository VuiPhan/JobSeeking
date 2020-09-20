using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UtelsLevelTraining
    {
        public UtelsLevelTraining()
        {
            UteappAppEducation = new HashSet<UteappAppEducation>();
        }

        public int RecId { get; set; }
        public string LevelTrainingId { get; set; }
        public string LevelTrainingName { get; set; }
        public string LevelTrainingName2 { get; set; }
        public string Notes { get; set; }

        public virtual ICollection<UteappAppEducation> UteappAppEducation { get; set; }
    }
}
