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
        
        [HttpPost("UpdateCategory")]
        [Authorize(Policy = Policies.Admin)]
        public async Task<object> UpdateCategory([FromForm] Form_CategoryAdmin form)
        {
            int result;
            IActionResult response = Unauthorized();
            try
            {
                result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_Admin_UpdateCategoriesList " +
               "@CategoryCode={0},@CategoryName={1},@TypeCategory={2}", form.CategoryCode, form.CategoryName, form.TypeCategory
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
        [HttpPost("LockCategory_Admin")]
        [Authorize(Policy = Policies.Admin)]
        public async Task<object> LockCategory_Admin(int CategoryCode,int TypeCategory)
        {
            int result;
            IActionResult response = Unauthorized();
            try
            {
                result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_Admin_LockCategoriesList " +
               "@CategoryCode={0},@TypeCategory={1}", CategoryCode, TypeCategory
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
