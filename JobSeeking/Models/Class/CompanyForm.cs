using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobSeeking.Models.Class
{
    public class CompanyForm
    {

    }
    public class ReviewCompany
    {
        public int RecID { get; set; }
        public int UserID { get; set; }
        public int CompanyID { get; set; }
        public string ILike { get; set; }
        public string Improve { get; set; }
        public string TitleReview { get; set; }
        public int Star { get; set; }
    }
}
