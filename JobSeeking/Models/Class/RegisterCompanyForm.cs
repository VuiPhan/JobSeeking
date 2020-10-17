using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobSeeking.Models.Class
{
    public class RegisterCompanyForm
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string CompanyAddress { get; set; }
        public int CompanyType{ get; set; }

        public string Password { get; set; }
        public string CompanyName { get; set; }
        public string TimeWorking { get; set; }

        public string ImageName { get; set; }
        public IFormFile ImageFile { get; set; }
    }
}
