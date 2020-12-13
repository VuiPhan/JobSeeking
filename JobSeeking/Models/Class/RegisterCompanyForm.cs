using Microsoft.AspNetCore.Http;

namespace JobSeeking.Models.Class
{
    public class RegisterCompanyForm
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string CompanyAddress { get; set; }
        public int CompanyType { get; set; }
        public int OTMode { get; set; }
        public string ScalePeople { get; set; }
        public string LocationProvince { get; set; }

        public string Password { get; set; }
        public string CompanyName { get; set; }
        public string TimeWorking { get; set; }

        public string ImageName { get; set; }
        public string IntroduceCompany { get; set; }
        public IFormFile ImageFile { get; set; }


        public string Image1 { get; set; }
        public IFormFile ImageFile1 { get; set; }


        public string Image2 { get; set; }
        public IFormFile ImageFile2 { get; set; }


        public string Image3 { get; set; }
        public IFormFile ImageFile3 { get; set; }



    }
    public class CompanyPage
    {
        public int CompanyID { get;set;}
        public string CompanyName { get; set; }

        public string CompanyAddress { get; set; }

        public string CompanyType { get; set; }

        public string ImageLogo { get; set; }

        public string Image1 { get; set; }

        public string Image2 { get; set; }

        public string Image3 { get; set; }

        public string TimeWorking { get; set; }
        public string IntroduceCompany { get; set; }
        public string LocationProvince { get; set; }
        public string ScalePeople { get; set; }
        public decimal AvgStar { get; set; }
        public int NumberReview { get; set; }
    }
}
