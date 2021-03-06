﻿using System;
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
    public class SeekerController : LoginInfoSingleton
    {
        private readonly JobSeekingContext _context;
        private IConfiguration _config;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly LoginInfo loginInfo;
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
        [HttpGet("GetIsShowTimeline")]
        [Authorize(Policy = Policies.User)]
        public async Task<object> GetIsShowTimeline()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            List<ShowTimeLine> data = new List<ShowTimeLine>();
            try
            {
                data = await _context.ShowTimeLines.FromSqlRaw("EXEC dbo.UTE_Seeker_GetIsShowTimeline {0}", claims[5].Value).ToListAsync();
            }
            catch (Exception e)
            {

            }
            return data.AsEnumerable().SingleOrDefault();
        }
        [HttpGet("ApplicantGetViewProfile")]
        [Authorize(Policy = Policies.User)]
        public async Task<object> ApplicantGetViewProfile()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            List<StatiscalViewProfile> data = new List<StatiscalViewProfile>();
            try
            {
                data = await _context.StatiscalViewProfiles.FromSqlRaw("EXEC dbo.UTE_Applicant_GetViewProfile {0}", claims[5].Value).ToListAsync();
            }
            
            catch(Exception e)
            {

            }
            return data;
        }
        [HttpPost("UpdateStatiscalViewProfile")]
        [Authorize(Policy = Policies.Recruiter)]
        public async Task<object> UpdateStatiscalViewProfile(int CandidateCode)
        {
            //    UploadImage uploadImage = new UploadImage();
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_SYS_Update_StatiscalViewProfile" +
            " @CandidateCode={0}",
            CandidateCode
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
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_Seeker_InsertUpdateEducation" +
            " @CandidateCode={0},@FromTime={1},@ToTime={2},@DegreeTraining={3},@NameSchool={4},@RecID={5},@Descriptions = {6}",
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
        [HttpPost("DeleteEducation")]
        public async Task<object> DeleteEducation(int RecID)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_Seeker_DeleteEducation" +
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
        
            bool IsOwn = false;
            if(claims.Count > 0)
            {
                if(claims[5].Value != "")
                {
                    if (Int32.Parse(claims[5].Value) == CandidateCode)
                    {
                        // Đây là người đã login với 
                        IsOwn = true;
                    }
                }
              
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
            var data = (dynamic)null;
            try {
                data =  await _context.ListWorkProcessOfCandidate.FromSqlRaw("EXEC dbo.UTE_Seeker_GetListWorkProcess {0},{1}", CandidateCode, IsOwn).ToListAsync();

            }
            catch (Exception e)
            {
                
            }
            return data;
        }
        [HttpGet("GetListCertificate")]
        public async Task<object> GetListCertificate(int? CandidateCode)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            bool IsOwn = true;
            if (CandidateCode == null)
            {
                CandidateCode = Int32.Parse(claims[5].Value);
            }
            var data = (dynamic)null;
            try
            {
                data = await _context.ListCertificateOfCandidates.FromSqlRaw("EXEC dbo.UTE_Seeker_GetListCertificate {0},{1}", CandidateCode, IsOwn).ToListAsync();

            }
            catch (Exception e)
            {

            }
            return data;
        }
        [HttpPost("AddCertificate")]
        [Authorize(Policy = Policies.User)]
        public async Task<object> AddCertificate([FromForm] Certificate certificate)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_Seeker_InsertUpdateCertificate" +
            " @CandidateCode={0},@FromTime={1},@ToTime={2},@CertificateName={3},@CertificateType={4},@DegreePlace={5},@RecID={6},@Descriptions = {7}",
            claims[5].Value,
            certificate.FromTime,
            certificate.ToTime,
            certificate.CertificateName,
            certificate.CertificateType,
            certificate.DegreePlace,
            certificate.RecID,
            certificate.Descriptions
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
        [HttpPost("DeleteCertificate")]
        public async Task<object> DeleteCertificate(int RecID)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_Seeker_DeleteCertificate" +
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
        [HttpPost("UpdateStatusViewTimeLine")]
        [Authorize(Policy = Policies.User)]
        public async Task<object> UpdateStatusViewTimeLine(bool status)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_Seeker_UpdateStatusViewTimeLine" +
            " @CandidateCode={0},@Status={1}",
            claims[5].Value, status
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
        [HttpGet("GetListEducation")]
        public async Task<object> GetListEducation(int? CandidateCode)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            if (CandidateCode == null)
            {
                CandidateCode = Int32.Parse(claims[5].Value);
            }
            List<ListEducation> data = new List<ListEducation>();
            try
            {
                data = await _context.ListEducations.FromSqlRaw("EXEC dbo.UTE_Seeker_GetListEducation {0}", CandidateCode).ToListAsync();
            }
            catch (Exception e)
            {

            }
            return data;
        }

        [HttpGet("GetViewSeekerBy")]
        [Authorize(Policy = Policies.Recruiter)]
        public async Task<object> ViewSeekerByCandidateCode(int CandidateCode, int JobID)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var data = await _context.FormJobSeekers.FromSqlRaw("EXEC dbo.UTE_Seeker_GetInfomationByRecruiter {0},{1},{2}", CandidateCode, 1,JobID).ToListAsync(); // Ngày 14/07: Vì public hết nên ko cần xét nữa
            return data.AsEnumerable().SingleOrDefault();
        }
        [HttpGet("GetTimelineCandidate")]
        [Authorize(Policy = Policies.User)]
        public async Task<object> GetTimelineCandidate()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var data = await _context.TimeLineCandidates.FromSqlRaw("EXEC dbo.UTE_Seeker_GetTimelineCandidate {0}", claims[5].Value).ToListAsync();
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
