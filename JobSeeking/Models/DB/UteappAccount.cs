using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UteappAccount
    {
        public UteappAccount()
        {
            UteappWorks = new HashSet<UteappWork>();
            UtecomCompanies = new HashSet<UtecomCompany>();
        }

        public int UserId { get; set; }
        public string UserLogin { get; set; }
        public string Password { get; set; }
        public string Roles { get; set; }

        public virtual ICollection<UteappWork> UteappWorks { get; set; }
        public virtual ICollection<UtecomCompany> UtecomCompanies { get; set; }
    }
}
