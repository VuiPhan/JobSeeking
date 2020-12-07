using JobSeeking.Models.Class;
using JobSeeking.Models.DB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;
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
        public async Task<object> Get(int? CompanyID,int? CandidateCode,bool IsOwnCompany)
        {
            var dataJob = await _context.JobForms.FromSqlRaw("EXEC dbo.UTE_spGetListJobForKendo {0},{1},{2}",CompanyID, CandidateCode,IsOwnCompany).ToListAsync();
            return dataJob;
        }
        [HttpGet("GetJobByID")]
        public async Task<object> GetJobByID(int jobid)
        {
            var dataJob = await _context.JobPages.FromSqlRaw("EXEC dbo.UTE_Job_GetInfomation {0}", jobid).ToListAsync();
            var dataTagSkill = await _context.ValueLists.FromSqlRaw("EXEC dbo.spUTE_GetComboboxForJob {0},{1},{2},{3}", "UTELS_GetJobSkill","VN", jobid,1).ToListAsync();
            var dataTagTitle = await _context.ValueLists.FromSqlRaw("EXEC dbo.spUTE_GetComboboxForJob {0},{1},{2},{3}", "UTELS_GetJobTitle", "VN", jobid, 2).ToListAsync();
            var dataTagPriorityDegree = await _context.ValueLists.FromSqlRaw("EXEC dbo.spUTE_GetComboboxForJob {0},{1},{2},{3}", "UTELS_GetPriorityDegree", "VN", jobid, 3).ToListAsync();
            var arlist2 = new ArrayList()
                {
                    dataJob, dataTagSkill, dataTagTitle,dataTagPriorityDegree
                };
            return arlist2;
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
