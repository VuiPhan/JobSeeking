using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobSeeking.Models.Class
{
    public class FormJobSeeker
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public DateTime BirthDay { get; set; }
        public string BirthDayString { get; set; }
        public string PhoneNumber { get; set; }
        public int Gender { get; set; }
        public int AcademicLevel { get; set; }

    }
    public class FormHeaderCompany
    {
        public int CompanyID { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public int CompanyType { get; set; }
        public string ImageLogo { get; set; }
        public string Image1 { get; set; }
        public string Image3 { get; set; }
        public string Image2 { get; set; }

    }
}
