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
    public class ManagerCategoriesController : ControllerBase
    {
        private readonly JobSeekingContext _context;
        public ManagerCategoriesController(JobSeekingContext context)
        {
            _context = context;
        }
        [HttpGet("GetManagerCategories")]
        public async Task<object> GetManagerCategories(int? typeCategories)
        {
            List<ManagerCategories> lstManagerCategories = new List<ManagerCategories>();
            try
            {
                lstManagerCategories = await _context.ManagerCategoriess.FromSqlRaw("EXEC dbo.UTE_Admin_GetManagerCategories {0}", typeCategories).ToListAsync();
            }
            catch (Exception e)
            {

            }
            return lstManagerCategories;
        }
    }
}
