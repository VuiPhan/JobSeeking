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
        public async Task<ActionResult<PublishedRecuitForm>> PublishedRecuit([FromForm] PublishedRecuitForm publishedRecuitForm)
        {

            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            await _context.Database.ExecuteSqlRawAsync("dbo.UTECompany_PublishedRecuit" +
               " @CompanyID={0},@JobsTitle={1},@JobDescriptions={2},@JobRequirements={3}," +
               "@Strengths={4},@PriorityDegree={5},@ReasonsToJoin ={6},@LoveWorkingHere ={7}," +
               "@SalaryFrom={8},@SalaryTO={9},@WorkLocation={10},@OTMode={11}," +
               "@JobSkillIDs={12},@JobTitleIDs={13},@JobLocations={14},@JobID={15},@IsPublic={16}",
               claims[4].Value,
               publishedRecuitForm.Title,
               publishedRecuitForm.JobDescriptions,
               publishedRecuitForm.RequireCV,
               publishedRecuitForm.Strengths,
               publishedRecuitForm.PriorityDegree,
               publishedRecuitForm.ReasonsToJoin,
               publishedRecuitForm.LoveWorkingHere,
               publishedRecuitForm.SalaryFrom,
               publishedRecuitForm.SalaryTo,
               publishedRecuitForm.WorkLocation,
               publishedRecuitForm.OTMode,
               publishedRecuitForm.JobSkillIDs,
               publishedRecuitForm.JobTitleIDs,
               publishedRecuitForm.JobLocations,
               publishedRecuitForm.JobID,
               publishedRecuitForm.IsPublic
               );
            return StatusCode(201);
        }
        [HttpGet("GetForEdit")]
        //[Authorize(Policy = Policies.Recruiter)]
        public async Task<object> GetInfoJob(int? jobid)
        {
            var dataJob = await _context.PublishedRecuitForms.FromSqlRaw("EXEC dbo.UTE_Job_GetInfomationToEdit {0}", jobid).ToListAsync();
            return dataJob.AsEnumerable().SingleOrDefault();
        }
    }
}
