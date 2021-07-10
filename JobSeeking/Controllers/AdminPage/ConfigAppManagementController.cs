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
using System.Collections;
namespace JobSeeking.Controllers.AdminPage
{
    [Route("api/[controller]")]
    [Authorize(Policy = Policies.Admin)]
    [ApiController]
    public class ConfigAppManagementController : ControllerBase
    {
        private readonly JobSeekingContext _context;
        public ConfigAppManagementController(JobSeekingContext context)
        {
            _context = context;
        }
        [HttpGet("GetManagerConfigApps")]
        public async Task<object> GetManagerCategories()
        {
            List<ManagerConfigApp> lstManagerConfigApp = new List<ManagerConfigApp>();
            try
            {
                lstManagerConfigApp = await _context.ManagerConfigApps.FromSqlRaw("EXEC dbo.UTE_Admin_GetConfigApp").ToListAsync();
            }
            catch (Exception e)
            {

            }
            return lstManagerConfigApp;
        }
        
        [HttpPost("UpdateConfigApp")]
        [Authorize(Policy = Policies.Admin)]
        public async Task<object> UpdateConfigApp([FromForm] Form_ConfigApp form)
        {
            int result;
            IActionResult response = Unauthorized();
            try
            {
                result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_Admin_UpdateConfigApp " +
               "@NameConfig={0},@ContentConfig={1},@Descriptionss={2}", form.NameConfig, form.ContentConfig, form.Descriptionss
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
