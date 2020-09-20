﻿using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UtelsTrainingPlaces
    {
        public UtelsTrainingPlaces()
        {
            UteappAppEducation = new HashSet<UteappAppEducation>();
        }

        public int RecId { get; set; }
        public string TrainingPlacesId { get; set; }
        public string TrainingPlacesName { get; set; }
        public string TrainingPlacesName2 { get; set; }
        public string Notes { get; set; }

        public virtual ICollection<UteappAppEducation> UteappAppEducation { get; set; }
    }
}
