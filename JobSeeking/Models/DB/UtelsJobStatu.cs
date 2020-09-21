using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UtelsJobStatu
    {
        public UtelsJobStatu()
        {
            UteappJobInformations = new HashSet<UteappJobInformation>();
        }

        public int RecId { get; set; }
        public string JobStatusId { get; set; }
        public string JobStatusName { get; set; }
        public string JobStatusName2 { get; set; }

        public virtual ICollection<UteappJobInformation> UteappJobInformations { get; set; }
    }
}
