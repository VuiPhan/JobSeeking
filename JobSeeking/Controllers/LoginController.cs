using JobSeeking.Models.Class;
using JobSeeking.Models.DB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace JobSeeking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        private readonly JobSeekingContext _context;
        JobSeekingContext db = new JobSeekingContext();
        public LoginController(JobSeekingContext context,IConfiguration config)
        {
            _context = context;
            _config = config;
        }   
        [HttpGet]
        public async Task<IActionResult> LoginAsync(string userName, string pass)
        {
            UserLogin login = new UserLogin();
            login.UserName = userName;
            login.Password = pass;
            IActionResult response = Unauthorized();
            var user = await AuthenticationUser(login);
            if (user != null)
            {
                //var tokenStr = GenerateJSONWebToken(user);
                var tokenStr = GenerateJWTToken(user);
                response = Ok(new { token = tokenStr, Message = "" });
                return response;
            }
            return Ok(new { token = "",Message = "Không hợp lệ" });

        }
        private async Task<UserLogin> AuthenticationUser(UserLogin userLogin)
        {
            var data = await _context.UserLogins.FromSqlRaw("EXEC dbo.UTE_spLoginSystem {0},{1}", userLogin.UserName, userLogin.Password).ToListAsync();
            var userLoginResult = data.AsEnumerable().SingleOrDefault();
            return userLoginResult;
        }
        private string GenerateJSONWebToken(UserLogin userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
               // new Claim(JwtRegisteredClaimNames.Sub,userInfo.UserName),
                new Claim(JwtRegisteredClaimNames.UniqueName,userInfo.UserName),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role,userInfo.Roles),
                new Claim(ClaimTypes.NameIdentifier,userInfo.UserName)

            };
            var token = new JwtSecurityToken(
                    issuer: _config["Jwt:Issuer"],
                    audience: _config["Jwt:Issuer"],
                    claims,
                    expires: DateTime.Now.AddMinutes(60),
                    signingCredentials: credentials);
            var encodetoken = new JwtSecurityTokenHandler().WriteToken(token);
            return encodetoken;
        }
        [HttpPost("Post")]
        [Authorize(Policy = Policies.User)]
        public string Post()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var userName = claims[0].Value;
            return "Wellcome " + userName;
        }
        [HttpGet("GetValue")]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }
        string GenerateJWTToken(UserLogin userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                    new Claim(JwtRegisteredClaimNames.Sub, userInfo.UserName),
                    new Claim("UserID", userInfo.UserID.ToString()),
                    new Claim("UserLoginDB", userInfo.UserName.ToString()),
                    new Claim("role", userInfo.Roles),
                    new Claim("companyID", userInfo.CompanyID.ToString()),
                    new Claim("CadidateCode", userInfo.CandidateCode.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
