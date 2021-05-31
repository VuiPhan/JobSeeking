using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobSeeking.Common;
using JobSeeking.Models.Class;
using JobSeeking.Models.DB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobSeeking.Controllers.AdminPage
{
    [Route("api/[controller]")]
    [Authorize(Policy = Policies.Admin)]
    [ApiController]
    public class TemplateEmailAdminController : ControllerBase
    {
        private readonly JobSeekingContext _context;
        public TemplateEmailAdminController(JobSeekingContext context)
        {
            _context = context;
        }
        [HttpGet("GetAll_TemplateEmailAdmin")]
        [Authorize(Policy = Policies.Admin)]
        public async Task<object> GetAll_TemplateEmailAdmin()
        {
              
            List<TemplateOfEmail_Admin> allTemplateEmail = new List<TemplateOfEmail_Admin>();
            try
            {
                allTemplateEmail = await _context.TemplateOfEmail_Admins.FromSqlRaw("EXEC dbo.UTE_Admin_GetAllTemplateEmail").ToListAsync();
            }
            catch (Exception e)
            {

            }
            return allTemplateEmail;
        }
        [HttpPost("UpdateTemplateEmail_Admin")]
        [Authorize(Policy = Policies.Admin)]
        public async Task<object> UpdateTemplateEmail_Admin([FromForm] TemplateOfEmail_Admin form)
        {
            int result;
            IActionResult response = Unauthorized();
            try
            {
                result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_Admin_UpdateTemplateEmail " +
               "@ContentConfig={0},@ContentConfig2={1},@RecID={2}", form.SuggestSubject, form.SuggestContentEmail ,form.TemplateID
               );
            }
            catch (Exception e)
            {
                response = Ok(new { Error = e.Message });
                return response;
            }
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
