using System;
using System.Collections.Generic;
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
    public class PublishedRecuitController : ControllerBase
    {
        private readonly JobSeekingContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;
        public PublishedRecuitController(JobSeekingContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            this._hostEnvironment = hostEnvironment;
        }
        [HttpPost]
        public async Task<ActionResult<PublishedRecuitForm>> RegisterCompany([FromForm] RegisterCompanyForm registerCompanyForm)
        {
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
    }
}
