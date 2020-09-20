using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UtelsTypeOfLabor
    {
        public UtelsTypeOfLabor()
        {
            UteappJobInformation = new HashSet<UteappJobInformation>();
        }

        public int RecId { get; set; }
        public string TypeOfLaborId { get; set; }
        public string TypeOfLaborName { get; set; }
        public string TypeOfLaborName2 { get; set; }

        public virtual ICollection<UteappJobInformation> UteappJobInformation { get; set; }
    }
}
