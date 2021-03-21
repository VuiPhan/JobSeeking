using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using JobSeeking.Common;
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
        private readonly IWebHostEnvironment _hostEnvironment;

        public SeekerController(JobSeekingContext context, IConfiguration config, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _config = config;
            this._hostEnvironment = hostEnvironment;

        }
        [HttpPost("Post")]
        public async Task<object> RegisterSeeker([FromForm] FormJobSeekerAddUpdate formJobSeeker)
        {
            //    UploadImage uploadImage = new UploadImage();
            string PathAvatar = null;
            if (formJobSeeker.ImageFile != null)
            {
                PathAvatar = await SaveImage(formJobSeeker.ImageFile);
            }
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_Seeker_Register" +
            " @LastName={0},@FirstName={1},@PassWord={2},@BirthDay={3}," +
            "@PhoneNumber={4},@Gender={5},@AcademicLevel={6},@Email={7}," +
            "@Facebook={8},@Linkin={9},@Github={10},@SelfIntroduce={11}," +
            "@PathAvatar={12},@TitleJob={13},@AliasesName={14},@IsAcceptWork={15},@CandidateCode={16}",
            formJobSeeker.LastName,
            formJobSeeker.FirstName,
            formJobSeeker.Password,
            formJobSeeker.BirthDay,
            formJobSeeker.PhoneNumber,
            formJobSeeker.Gender,
            formJobSeeker.AcademicLevel,
            formJobSeeker.Email,

            formJobSeeker.Facebook,
            formJobSeeker.Linkin,
            formJobSeeker.Github,
            formJobSeeker.SelfIntroduce,
            PathAvatar,
            formJobSeeker.TitleJob,
            formJobSeeker.AliasesName,
            formJobSeeker.IsAcceptWork,
            formJobSeeker.CandidateCode
            );
            IActionResult response = Unauthorized();
            if (formJobSeeker.CandidateCode != null && result > 0)
            {
                response = Ok(new { Error = "" });
                return response;
            }
            if (result > 1)
            {
                response = Ok(new { Error = "" });
                return response;
            }
            response = Ok(new {Error = "Có lỗi" });
            return response;
        }
        [HttpPost("AddClick")]
        public async Task<object> AddClick(int CandidateCode, int JobID)
        {
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_spInsertCandidateClick" +
            " @CandidateCode={0},@JobID={1}",
            CandidateCode,
            JobID
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
        [HttpGet("Get")]
        [Authorize(Policy = Policies.User)]
        //[Authorize(Policy = Policies.Recruiter)]
        public async Task<object> ViewSeeker(int formJobSeeker)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var data = await _context.FormJobSeekers.FromSqlRaw("EXEC dbo.UTE_Seeker_GetInfomation {0}", claims[5].Value).ToListAsync();
            return data;
        }
        [HttpGet("GetWorkInfo")]
        //[Authorize(Policy = Policies.User)]
        //[Authorize(Policy = Policies.Recruiter)]
        public async Task<object> GetWorkInfo(int CandidateCode)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var data = await _context.WorkInfos.FromSqlRaw("EXEC dbo.UTE_Seeker_GetWorkInfo {0}", CandidateCode).ToListAsync();
            return data;
        }

        [HttpPost("UpdateWorkInfo")]
        [Authorize(Policy = Policies.User)]
        public async Task<object> UpdateWorkInfo([FromForm] WorkInfo workInfo)
        {
            //    UploadImage uploadImage = new UploadImage();
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_Seeker_UpdateWorkInfo" +
            " @CandidateCode={0},@JobSkillIDs={1},@JobTitleIDs={2},@JobLocations={3}",
            claims[5].Value,
            workInfo.JobSkillIDs,
            workInfo.JobTitleIDs,
            workInfo.JobLocations
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
        [HttpPost("AddWorkProcess")]
        [Authorize(Policy = Policies.User)]
        public async Task<object> AddWorkProcess([FromForm] WorkProcess workProcess)
        {
            //    UploadImage uploadImage = new UploadImage();
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_Seeker_InsertUpdateWorkProcess" +
            " @CandidateCode={0},@FromTime={1},@ToTime={2},@JobTitle={3},@StaffType={4},@CompanyName={5},@RecID={6},@Description = {7}",
            claims[5].Value,
            workProcess.FromTime,
            workProcess.ToTime,
            workProcess.JobTitle,   
            workProcess.StaffType,
            workProcess.CompanyName,
            workProcess.RecID,
            workProcess.Description
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
        [HttpPost("AddEducation")]
        [Authorize(Policy = Policies.User)]
        public async Task<object> AddEducation([FromForm] Education education)
        {
            //    UploadImage uploadImage = new UploadImage();
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_Seeker_InsertUpdateWorkProcess" +
            " @CandidateCode={0},@FromTime={1},@ToTime={2},@JobTitle={3},@StaffType={4},@CompanyName={5},@RecID={6},@Description = {7}",
            claims[5].Value,
            education.FromTime,
            education.ToTime,
            education.DegreeTraining,
            education.NameSchool,
            education.RecID,
            education.Descriptions
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
        [HttpPost("DeleteWorkProcess")]
        public async Task<object> DeleteWorkProcess(int RecID)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_Seeker_DeleteWorkProcess" +
            " @CandidateCode={0},@RecID={1}",
            claims[5].Value,
            RecID
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
        [HttpGet("GetListCV")]
        public async Task<object> GetListCV(int? CandidateCode)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            bool IsOwn = true;
            if(claims[5].Value.ToString() == "")
            {
                // Nhà tuyển dụng
                IsOwn = false;
            }
            var data = await _context.ListCVOfCandidates.FromSqlRaw("EXEC dbo.UTE_Seeker_GetListCV {0},{1}", CandidateCode, IsOwn).ToListAsync();
            return data;
        }

        [HttpGet("GetListWorkProcess")]
        public async Task<object> GetListWorkProcess(int? CandidateCode)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            bool IsOwn = true;
            if (CandidateCode == null )
            {
                CandidateCode = Int32.Parse(claims[5].Value);
            }
            var data = await _context.ListWorkProcessOfCandidate.FromSqlRaw("EXEC dbo.UTE_Seeker_GetListWorkProcess {0},{1}", CandidateCode, IsOwn).ToListAsync();

            return data;
        }
        [HttpGet("GetListEducation")]
        public async Task<object> GetListEducation(int? CandidateCode)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            bool IsOwn = true;
            if (CandidateCode == null)
            {
                CandidateCode = Int32.Parse(claims[5].Value);
            }
            var data = await _context.ListEducations.FromSqlRaw("EXEC dbo.UTE_Seeker_GetListEducation {0}", CandidateCode).ToListAsync();

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
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

    }
}
