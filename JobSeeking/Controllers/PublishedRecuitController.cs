using JobSeeking.Models.Class;
using JobSeeking.Models.DB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

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

            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            await _context.Database.ExecuteSqlRawAsync("dbo.UTECompany_PublishedRecuit" +
               " @CompanyID={0},@JobsTitle={1},@JobDescriptions={2},@JobRequirements={3}," +
               "@Strengths={4},@PriorityDegree={5},@ReasonsToJoin ={6},@LoveWorkingHere ={7},@SalaryFrom={8},@SalaryTO={9},@WorkLocation={10},@OTMode={11}",
               claims[4].Value,
               registerCompanyForm.Title,
               registerCompanyForm.JobDescription,
               registerCompanyForm.RequireCV,
               registerCompanyForm.Strengths,
               registerCompanyForm.PriorityDegree,
               registerCompanyForm.ReasonsToJoin,
               registerCompanyForm.LoveWorkingHere,
               registerCompanyForm.SalaryFrom,
               registerCompanyForm.SalaryTo,
               registerCompanyForm.WorkLocation,
               registerCompanyForm.OTMode
               );
            return StatusCode(201);
        }
    }
}
