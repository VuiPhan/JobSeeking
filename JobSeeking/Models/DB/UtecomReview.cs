using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UtecomReview
    {
        public int RecId { get; set; }
        public int? UserId { get; set; }
        public int? CompanyId { get; set; }
        public string Ilike { get; set; }
        public string Improve { get; set; }
        public string TitleReview { get; set; }
        public int? Star { get; set; }
        public DateTime? DateReview { get; set; }
    }
}
