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
    public class RecruitmentController : ControllerBase
    {
        private readonly JobSeekingContext _context;

        public RecruitmentController(JobSeekingContext context)
        {
            _context = context;
        }
        [HttpPost("AddUpdateRoundInterview")]
        [Authorize(Policy = Policies.Recruiter)]
        public async Task<object> AddUpdateRoundInterview([FromForm] RoundInterview form)
        {
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
    }
}
