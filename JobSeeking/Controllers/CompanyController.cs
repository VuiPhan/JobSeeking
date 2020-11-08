using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobSeeking.Models.Class;
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
        [HttpGet("GetReviewCompany")]
        public async Task<object> GetReviewCompany(int CompanyID)
        {
            var data = await _context.ReviewCompanys.FromSqlRaw("EXEC dbo.UTE_spGetListReviewForCompanyKendo {0}", CompanyID).ToListAsync();
            return data;
        }
        [HttpPost("PostReview")]
        public async Task<object> PostReview([FromForm] ReviewCompany reviewCompany)
        {
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_spInsertReviewCompany" +
            " @CompanyID={0},@UserID={1},@ILike={2},@Improve={3}," +
            "@TitleReview={4},@Star={5}",
            reviewCompany.CompanyID,
            reviewCompany.UserID,
            reviewCompany.ILike,
            reviewCompany.Improve,
            reviewCompany.TitleReview,
            reviewCompany.Star
            );
            IActionResult response = Unauthorized();
            if (result > 1)
            {
                response = Ok(new { Error = "" });
                return response;
            }
            response = Ok(new { Error = "Có lỗi" });
            return response;
        }
    }
}
