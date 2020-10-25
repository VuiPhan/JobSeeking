﻿using System;
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
            registerCompanyForm.ImageName = await SaveImage(registerCompanyForm.ImageFile);

            _context.Database.ExecuteSqlRaw("dbo.UTE_Company_Register" +
                " @FullName={0},@EmailAddress={1},@PassWord={2},@CompanyName={3}," +
                "@CompanyAddress={4},@TimeWorking={5},@ImageLogo={6},@CompanyType={7}", 
                registerCompanyForm.FullName,
                registerCompanyForm.Email,
                registerCompanyForm.Password,
                registerCompanyForm.CompanyName,
                registerCompanyForm.CompanyAddress,
                registerCompanyForm.TimeWorking,
                registerCompanyForm.ImageName,
                registerCompanyForm.CompanyType
                );

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
