using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobSeeking.Models.DB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobSeeking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly JobSeekingContext _context;
        public CompanyController(JobSeekingContext context)
        {
            _context = context;
        }
        [HttpGet("GetCompanyByID")]
        public async Task<object> GetCompanyByID(int CompanyID)
        {
            var data = await _context.CompanyPages.FromSqlRaw("EXEC dbo.spUTE_GetCompanyByID {0}", CompanyID).ToListAsync();
            var companyPage = data.AsEnumerable().SingleOrDefault();
            return companyPage;
        }
    }
}
