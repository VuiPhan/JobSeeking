﻿using JobSeeking.Models.Class;
using JobSeeking.Models.DB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
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
        public async Task<object> Get(int? CompanyID,int? CandidateCode,bool IsOwnCompany, bool IsReletive)
        {
            var dataJob = await _context.JobForms.FromSqlRaw("EXEC dbo.UTE_spGetListJobForKendo {0},{1},{2},{3}",CompanyID, CandidateCode,IsOwnCompany, IsReletive).ToListAsync();
            return dataJob;
        }
        [HttpGet("GetListJobForCandidate30Days")]
        [Authorize(Policy = Policies.User)]
        public async Task<object> GetListJobForCandidate30Days()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var dataJob = await _context.JobForms.FromSqlRaw("EXEC dbo.UTE_spGetListJobForCandidate30Days {0}", claims[5].Value).ToListAsync();
            return dataJob;
        }
        [HttpGet("GetJobForSearch")]
        public async Task<object> GetJobForSearch(string JobSkillIDs,string JobTitleIDs,string LocationValue)
        {
            var dataJob = await _context.JobForms.FromSqlRaw("EXEC dbo.UTE_spGetListJobForKendo_ForSearch {0},{1},{2}", JobSkillIDs, JobTitleIDs, LocationValue).ToListAsync();
            return dataJob;
        }

        [HttpGet("GetJobForSearchKeyword")]
        public async Task<object> GetJobForSearchKeyword(string KeyWord)
        {
            var dataJob = await _context.JobForms.FromSqlRaw("EXEC dbo.UTE_spGetListJobForKendo_ForSearchKeyWord {0}",KeyWord).ToListAsync();
            return dataJob;
        }


        [HttpGet("GetJobForApplyOfCandidate")]
        [Authorize(Policy = Policies.User)]
        public async Task<object> GetJobForApplyOfCandidate()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            List<JobForm> lstApplyOfCandidate = new List<JobForm>();
            try
            {
                lstApplyOfCandidate = await _context.JobForms.FromSqlRaw("EXEC dbo.UTE_spGetListJobForKendo_ForApply {0}", claims[5].Value).ToListAsync();

            }
            catch (Exception e)
            {
                //return e.Message;
            }
            return lstApplyOfCandidate;
        }

        [HttpGet("GetApplicantForNotification")]
        [Authorize(Policy = Policies.Recruiter)]
        public async Task<object> GetApplicantForNotification()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            List<ListNotificationForRecruit> lstNotificationForRecruit = new List<ListNotificationForRecruit>();
            try
            {
                lstNotificationForRecruit = await _context.ListNotificationForRecruits.FromSqlRaw("EXEC dbo.UTE_spGetListNotificationForRecruit {0}", claims[4].Value).ToListAsync();

            }
            catch (Exception e)
            {
                //return e.Message;
            }
            return lstNotificationForRecruit;
        }
        [HttpGet("UpdateViewProfileCandidate")]
        [Authorize(Policy = Policies.Recruiter)]
        public async Task<object> UpdateViewProfileCandidate(int? JobID, int? CandidateCode)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_spUpdateViewProfileCandidate" +
                " @JobID={0},@CandidateCode={1}", JobID, CandidateCode
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
           var result =  await _context.Database.ExecuteSqlRawAsync("dbo.UTE_spInsertApplyJob" +
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
        [HttpPost("CancelApplyJob")]
        [Authorize(Policy = Policies.User)]
        public async Task<object> CancelApplyJob(int JobID)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_spCancelApplyJob" +
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
        [HttpGet("CountJob")]
        public async Task<object> CountJob(int JobID)
        {
            var CountJob = (from job in _context.UteworkJobs select JobID).Count();
            return CountJob;

        }

    }
}
