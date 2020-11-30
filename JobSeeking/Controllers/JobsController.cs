using JobSeeking.Models.Class;
using JobSeeking.Models.DB;
using Microsoft.AspNetCore.Authorization;
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
    public class JobsController : ControllerBase
    {
        private readonly JobSeekingContext _context;
        public JobsController(JobSeekingContext context)
        {
            _context = context;
        }
        [HttpGet("Get")]
        public async Task<object> Get(int? CompanyID,int? CandidateCode)
        {
            var dataJob = await _context.JobForms.FromSqlRaw("EXEC dbo.UTE_spGetListJobForKendo {0},{1}",CompanyID, CandidateCode).ToListAsync();
            return dataJob;
        }
        [HttpGet("GetJobByID")]
        public async Task<object> GetJobByID(int jobid)
        {
            var dataJob = from jobs in _context.UteworkJobs
                          join company in _context.UtecomCompanies
                                 on jobs.CompanyId equals company.CompanyId
                          where jobs.JobId == jobid
                          select new
                          {
                              jobs.JobId,
                              jobs.JobDescriptions,
                              jobs.JobRequirements,
                              jobs.ReasonsToJoin,
                              company.CompanyName,
                              company.CompanyId,
                              jobs.PostingDate,
                              jobs.JobsTitle,
                              jobs.LoveWorkingHere,
                              company.ImageLogo,
                              company.TimeWorking,
                              company.CompanyAddress,
                          };

            return dataJob;
        }
        [HttpPost("ApplyJob")]
        [Authorize(Policy = Policies.User)]
        public async Task<object> ApplyJob(int JobID)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            await _context.Database.ExecuteSqlRawAsync("dbo.UTE_spInsertApplyJob" +
               " @CandidateCode={0},@JobID={1}", claims[5].Value, JobID
               );
            return StatusCode(201);
        }

    }
}
