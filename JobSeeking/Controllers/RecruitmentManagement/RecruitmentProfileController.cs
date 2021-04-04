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
    public class RecruitmentProfileController : LoginInfoSingleton
    {
        private readonly JobSeekingContext _context;

        public RecruitmentProfileController(JobSeekingContext context)
        {
            _context = context;
        }
        [HttpPost("AddCandidateToInterview")]
        [Authorize(Policy = Policies.Recruiter)]
        public async Task<object> AddCandidateToInterview(int JobID,int CandidateCode)
        {
            
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_spInsert_Update_APP_JobInterview" +
                " @CandidateCode={0},@JobID={1}", CandidateCode, JobID
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
        [HttpPost("PotentialCandidates")]
        [Authorize(Policy = Policies.Recruiter)]
        public async Task<object> PotentialCandidates(int CandidateCode)
        {
            LoginInfo LoginInfo = GetInfoLogin();
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_spInsert_Update_APP_PotentialCandidates" +
                " @CandidateCode={0},@CompanyID={1}", CandidateCode, LoginInfo.companyID
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
        [HttpPost("IgnoreCandidates")]
        [Authorize(Policy = Policies.Recruiter)]
        public async Task<object> IgnoreCandidates(int CandidateCode, int JobID)
        {
            LoginInfo LoginInfo = GetInfoLogin();
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_spCancelApplyJob" +
               " @CandidateCode={0},@JobID={1}", CandidateCode, JobID
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
