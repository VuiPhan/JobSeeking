using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UtecomCompany
    {
        public string CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public int? CompanyType { get; set; }
        public string Image { get; set; }
    }
}
