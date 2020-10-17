using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UtecomCompany
    {
        public int CompanyId { get; set; }
        public int? UserId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public int? CompanyType { get; set; }
        public string ImageLogo { get; set; }
        public string TimeWorking { get; set; }
    }
}
