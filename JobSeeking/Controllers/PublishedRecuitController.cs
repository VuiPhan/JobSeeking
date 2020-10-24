using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobSeeking.Models.Class;
using JobSeeking.Models.DB;
using Microsoft.AspNetCore.Authorization;
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
        public PublishedRecuitController(JobSeekingContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
        }
        [HttpPost("Post")]
        [Authorize(Policy = Policies.Recruiter)]
        public async Task<ActionResult<PublishedRecuitForm>> PublishedRecuit([FromForm] PublishedRecuitForm registerCompanyForm)
        {
            _context.Database.ExecuteSqlRaw("dbo.UTECompany_PublishedRecuit" +
               " @CompanyID={0},@JobsTitle={1},@JobDescriptions={2},@JobRequirements={3}," +
               "@Strengths={4},@PriorityDegree={5}",
               1,
               registerCompanyForm.Title,
               registerCompanyForm.JobDescription,
               registerCompanyForm.RequireCV,
               registerCompanyForm.Strengths,
               registerCompanyForm.PriorityDegree
               );
            return StatusCode(201);
        }
    }
}
