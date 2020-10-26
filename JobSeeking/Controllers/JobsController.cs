using JobSeeking.Models.DB;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobSeeking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        private readonly JobSeekingContext _context;
        public JobsController(JobSeekingContext context)
        {
            _context = context;
        }
        [HttpGet("Get")]
        public async Task<object> Get()
        {
            var dataJob = from jobs in _context.UteworkJobs
                          join company in _context.UtecomCompanies
                                 on jobs.CompanyId equals company.CompanyId
                          select new
                          {
                              jobs.JobId,
                              jobs.JobDescriptions,
                              jobs.JobRequirements,
                              jobs.ReasonsToJoin,
                              company.CompanyName,
                              jobs.PostingDate,
                              jobs.JobsTitle
                          };

            return dataJob;
        }
        [HttpGet("GetJobByID")]
        public async Task<object> GetJobByID(int jobid)
        {
            var dataJob = from jobs in _context.UteworkJobs
                          join company in _context.UtecomCompanies
                                 on jobs.CompanyId equals company.CompanyId
                          where jobs.JobId == jobid
                          select new
                          {
                              jobs.JobId,
                              jobs.JobDescriptions,
                              jobs.JobRequirements,
                              jobs.ReasonsToJoin,
                              company.CompanyName,
                              jobs.PostingDate,
                              jobs.JobsTitle,
                              jobs.LoveWorkingHere,
                              company.ImageLogo,
                              company.TimeWorking,
                              company.CompanyAddress,
                          };

            return dataJob;
        }
    }
}
