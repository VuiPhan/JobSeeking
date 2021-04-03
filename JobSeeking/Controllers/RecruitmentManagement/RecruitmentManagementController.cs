﻿using System;
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
        public async Task<object> GetRoundRecruit(int? CompanyID, int? CandidateCode)
        {
            try
            {
                var x = GetInfoLogin();
            }
            catch (Exception e)
            {

            }
            var dataJob = await _context.JobForms.FromSqlRaw("EXEC dbo.UTE_spGetListJobForKendo {0},{1},{2},{3}", CompanyID, CandidateCode).ToListAsync();
            return dataJob;
        }
        [HttpPost("ApplyJob")]
        [Authorize(Policy = Policies.Recruiter)]
        public async Task<object> ApplyJob(int JobID)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_spInsertApplyJob" +
                " @CandidateCode={0},@JobID={1}", claims[5].Value, JobID
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
