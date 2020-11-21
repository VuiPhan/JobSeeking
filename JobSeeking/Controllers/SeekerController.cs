using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using JobSeeking.Models.Class;
using JobSeeking.Models.DB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace JobSeeking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeekerController : ControllerBase
    {
        private readonly JobSeekingContext _context;
        private IConfiguration _config;

        public SeekerController(JobSeekingContext context, IConfiguration config)
        {
            _context = context;
            _config = config;

        }
        [HttpPost("Post")]
        public async Task<object> RegisterSeeker([FromForm] FormJobSeeker formJobSeeker)
        {

            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_Seeker_Register" +
            " @LastName={0},@FirstName={1},@PassWord={2},@BirthDay={3}," +
            "@PhoneNumber={4},@Gender={5},@AcademicLevel={6},@Email={7}",
            formJobSeeker.LastName,
            formJobSeeker.FirstName,
            formJobSeeker.Password,
            formJobSeeker.BirthDay,
            formJobSeeker.PhoneNumber,
            formJobSeeker.Gender,
            formJobSeeker.AcademicLevel,
            formJobSeeker.Email
            );
            IActionResult response = Unauthorized();
            if (result > 1)
            {
                response = Ok(new { Error = "" });
                return response;
            }
            response = Ok(new {Error = "Có lỗi" });
            return response;
        }
        [HttpGet("Get")]
        [Authorize(Policy = Policies.User)]
        //[Authorize(Policy = Policies.Recruiter)]
        public async Task<object> ViewSeeker(int formJobSeeker)
        {
            var data = await _context.FormJobSeekers.FromSqlRaw("EXEC dbo.UTE_Seeker_GetInfomation {0}", formJobSeeker).ToListAsync();
            return data;
        }

        [HttpGet("GetViewSeekerBy")]
        [Authorize(Policy = Policies.Recruiter)]
        public async Task<object> ViewSeekerByCandidateCode(int CandidateCode, int JobID)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var data = await _context.FormJobSeekers.FromSqlRaw("EXEC dbo.UTE_Seeker_GetInfomationByRecruiter {0},{1},{2}", CandidateCode, claims[4].Value,JobID).ToListAsync();
            return data.AsEnumerable().SingleOrDefault();
        }

    }
}
