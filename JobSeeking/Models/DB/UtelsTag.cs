using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UtelsTag
    {
        public int TagId { get; set; }
        public string TagName { get; set; }
        public int? Major { get; set; }
    }
}
