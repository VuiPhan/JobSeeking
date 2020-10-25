using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobSeeking.Models.DB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<object> Get()
        {
            var dataJob = from jobs in _context.UteworkJobs
                          join company in _context.UtecomCompanies
                                 on jobs.CompanyId equals company.CompanyId
                          select new
                          {
                              jobs.JobDescriptions,
                              jobs.JobRequirements,
                              jobs.ReasonsToJoin,
                              company.CompanyName,
                              jobs.PostingDate,
                              jobs.JobsTitle
                          };

            return dataJob;
        }
    }
}
