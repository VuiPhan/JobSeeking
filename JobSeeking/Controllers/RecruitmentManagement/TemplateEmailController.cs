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
    public class TemplateEmailController : ControllerBase
    {
        private readonly JobSeekingContext _context;

        public TemplateEmailController(JobSeekingContext context)
        {
            _context = context;
        }
        [HttpGet("GetTemplateEmailOfCompany")]
        [Authorize(Policy = Policies.Recruiter)]
        public async Task<object> GetTemplateEmailOfCompany()
        {
            List<TemplateOfEmail> templateEmail = new List<TemplateOfEmail>();
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            try
            {
                templateEmail = await _context.TemplateOfEmails.FromSqlRaw("EXEC dbo.UTE_Email_GetTemplateEmailOfCompany {0}", claims[4].Value).ToListAsync();
            }
            catch (Exception e)
            {

            }
            return templateEmail;
        }
        [HttpPost("UpdateTemplateEmail")]
        [Authorize(Policy = Policies.Recruiter)]
        public async Task<object> UpdateTemplateEmail([FromForm] TemplateOfEmail form)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_Email_UpdateTemplateEmail" +
                " @CompanyID={0},@RecID={1},@Subject={2},@ContentOfEmail={3},@TemplateID={4}",
                claims[4].Value, form.RecID, form.Subject, form.ContentOfEmail,form.TemplateID
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
