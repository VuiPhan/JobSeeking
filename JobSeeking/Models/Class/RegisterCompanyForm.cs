using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobSeeking.Models.Class
{
    public class RegisterCompanyForm
    {
        public string ImageName { get; set; }
        public IFormFile ImageFile { get; set; }
    }
}
