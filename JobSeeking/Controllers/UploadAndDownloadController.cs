using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using JobSeeking.Models.Class;
using Microsoft.AspNetCore.Hosting;
using JobSeeking.Common;
using JobSeeking.Models.DB;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace JobSeeking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadAndDownloadController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly JobSeekingContext _context;

        public UploadAndDownloadController(IWebHostEnvironment hostEnvironment, JobSeekingContext context)
        {
            this._hostEnvironment = hostEnvironment;
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> Download(string FileName)
        {
            //string variableName = "Screenshot201807318.png";
            string source_dir = String.Format("E:\\Nam4HKI\\ProjectFinal\\JobSeeking\\JobSeeking\\Images\\{0}", FileName);
            var memory = new MemoryStream();
            using (var stream = new FileStream(source_dir, FileMode.Open))
            {
                await stream.CopyToAsync(memory);

            }
            memory.Position = 0;
            var ext = Path.GetExtension(source_dir).ToLowerInvariant();
            return File(memory, GetMineTypes()[ext], Path.GetFileName(source_dir));
        }
        private Dictionary<string, string> GetMineTypes()
        {
            return new Dictionary<string, string>
            {
                { ".pdf","application/pdf" },
                 { ".png","image/png" },
                 { ".jpg","image/jpg" },

            };
        }
        [Authorize(Policy = Policies.User)]
        [HttpPost("UploadCV")]
        public async Task<object> UploadCV([FromForm] UpLoadCV fileCV)
        {
            UploadImage uploadImage = new UploadImage(_hostEnvironment);
            string pathCV = await uploadImage.SaveImage(fileCV.CVFile);
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_Seeker_InsertOrUpdateCV " +
            "@CandidateCode={0},@PathCV={1},@RecID={2},@JobTitleID={3}," +
            "@Description={4}",
            claims[5].Value,
            pathCV,
            null,
            fileCV.JobTitleID,
            fileCV.Description
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
    }
}
