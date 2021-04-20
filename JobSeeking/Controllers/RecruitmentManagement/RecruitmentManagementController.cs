using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using JobSeeking.Common;
using JobSeeking.Models.Class;
using JobSeeking.Models.DB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobSeeking.Controllers.RecruitmentManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecruitmentManagementController : LoginInfoSingleton
    {
        private readonly JobSeekingContext _context;

        public RecruitmentManagementController(JobSeekingContext context)
        {
            _context = context;
        }
        [HttpGet("GetRoundRecruit")]
        public async Task<object> GetRoundRecruit(int? JobID)
        {
            var dataJob = await _context.RoundInterviews.FromSqlRaw("EXEC dbo.UTE_Seeker_GetListRoundInterview {0}", JobID).ToListAsync();
            return dataJob;
        }
        [HttpGet("GetCandidateOfRoundRecruit")]
        public async Task<object> GetCandidateOfRoundRecruit(int? JobID)
        {
            List<CandidateOfRoundInterview> dataJob = new List<CandidateOfRoundInterview>();
            try
            {
                dataJob = await _context.CandidateOfRoundInterviews.FromSqlRaw("EXEC dbo.UTE_Seeker_GetListCandidateOfRoundInterview {0}", JobID).ToListAsync();
            }
            catch(Exception e){

            }
                 

            var x = dataJob
                .GroupBy(u => u.RoundName)
                .Select(grp => grp.ToList())
                .ToList();

            return x;
        }
        [HttpPost("AddUpdateRoundInterview")]
        [Authorize(Policy = Policies.Recruiter)]
        public async Task<object> AddUpdateRoundInterview([FromForm] RoundInterview form)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_spAddUpdateRoundInterview" +
                " @JobID={0},@RoundName={1},@DateInterview={2},@ContentInterview={3}",
                form.JobID, form.RoundName, form.DateInterview, form.ContentInterview
                );
            IActionResult response = Unauthorized();
            if (result > 0)
            {
                response = Ok(new { Error = "" });
                return response;
            }
            response = Ok(new { Error = "Có lỗi" });
            return response;
        }
        [HttpPost("UpdateResultOfCandidate")]
        [Authorize(Policy = Policies.Recruiter)]
        public async Task<object> UpdateResultOfCandidate([FromForm] CandidateOfRoundInterview form)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_spUpdateResultOfCandidate" +
                " @RecID={0},@DateInterview={1},@Result={2},@Descriptions={3}",
                form.RecID, form.DateInterview, form.Result, form.Descriptions
                );
            IActionResult response = Unauthorized();
            if (result > 0)
            {
                response = Ok(new { Error = "" });
                return response;
            }
            response = Ok(new { Error = "Có lỗi" });
            return response;
        }
        [HttpPost("SendNotificationToApplicant")]
        [Authorize(Policy = Policies.Recruiter)]
        public async Task<object> SendNotificationToApplicant(int? JobID, int? RoundInterview)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_Email_SendNotificationToApplicant_Cursor" +
                " @JobID={0},@RoundInterview={1}",
                JobID, RoundInterview
                );
            IActionResult response = Unauthorized();
            if (result > 0)
            {
                response = Ok(new { Error = "" });
                return response;
            }
            response = Ok(new { Error = "Có lỗi" });
            return response;
        }
    }
}
