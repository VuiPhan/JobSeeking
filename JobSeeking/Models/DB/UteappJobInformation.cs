﻿using System;

namespace JobSeeking.Models.DB
{
    public partial class UteappJobInformation
    {
        public int RecId { get; set; }
        public string CandidateCode { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public string TypeOfLaborId { get; set; }
        public string JobStatusId { get; set; }

        public virtual UtelsJobStatu JobStatus { get; set; }
        public virtual UtelsTypeOfLabor TypeOfLabor { get; set; }
    }
}
