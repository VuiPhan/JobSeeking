using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using JobSeeking.Models.Class;
using JobSeeking.Models.DB;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobSeeking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterCompanyController : ControllerBase
    {
        private readonly JobSeekingContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;
        public RegisterCompanyController(JobSeekingContext context,IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            this._hostEnvironment = hostEnvironment;
        }
        [HttpPost]
        public async Task<ActionResult<RegisterCompanyForm>> RegisterCompany([FromForm] RegisterCompanyForm registerCompanyForm)
        {
            var db = new JobSeekingContext();
            registerCompanyForm.ImageName = await SaveImage(registerCompanyForm.ImageFile);
            //var userType = _context.Set().FromSql("dbo.UTE_Company_Register @FullName={0}", registerCompanyForm.ImageName);
            db.Database.ExecuteSqlCommand("dbo.UTE_Company_Register @FullName", registerCompanyForm.ImageName);
            return StatusCode(201);
        }


        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

    }

}
