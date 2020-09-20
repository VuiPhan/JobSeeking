using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UteappAppEducation
    {
        public int RecId { get; set; }
        public string CandidateCode { get; set; }
        public string LevelTrainingId { get; set; }
        public string TrainingPlacesId { get; set; }
        public string TypeOfEducationId { get; set; }
        public string MajorsId { get; set; }
        public string MoreInformation { get; set; }

        public virtual UteappApplicant CandidateCodeNavigation { get; set; }
        public virtual UtelsLevelTraining LevelTraining { get; set; }
        public virtual UtelsTrainingPlaces LevelTrainingNavigation { get; set; }
        public virtual UtelsMajors Majors { get; set; }
        public virtual UtelsTypeOfEducation TypeOfEducation { get; set; }
    }
}
