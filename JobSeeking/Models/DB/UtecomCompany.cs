using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UtecomCompany
    {
        public UtecomCompany()
        {
            UteworkJobs = new HashSet<UteworkJob>();
        }

        public int CompanyId { get; set; }
        public int? UserId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public int? CompanyType { get; set; }
        public string ImageLogo { get; set; }
        public string TimeWorking { get; set; }
        public string Image1 { get; set; }
        public string Image2 { get; set; }
        public string Image3 { get; set; }
        public string IntroduceCompany { get; set; }
        public string LocationProvince { get; set; }
        public string ScalePeople { get; set; }

        public virtual UteappAccount User { get; set; }
        public virtual ICollection<UteworkJob> UteworkJobs { get; set; }
    }
}
