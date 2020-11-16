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
    public class CommonController : ControllerBase
    {
        private readonly JobSeekingContext _context;
        public CommonController(JobSeekingContext context)
        {
            _context = context;

        }
        [HttpGet("Get")]
        //[Authorize(Policy = Policies.Recruiter)]
        public async Task<object> GetHeader(int CompanyID,int IsCompany)
        {
            var data = await _context.FormHeaderCompanys.FromSqlRaw("EXEC dbo.spUTE_GetHeaderForCompany {0},{1}", CompanyID, IsCompany).ToListAsync();
            var headerCompany = data.AsEnumerable().SingleOrDefault();
            return headerCompany;
        }
        [HttpGet("GetTags")]
        //[Authorize(Policy = Policies.Recruiter)]
        public async Task<object> GetTags(int CompanyID)
        {
            var data = await _context.UtelsTags.Where(p => p.Major == 1).ToListAsync();
            return data;
        }




    }
}
