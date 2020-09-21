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
        JobSeekingContext db = new JobSeekingContext();
        public async Task<object> Get()
        {
            //  var data = db.Select(p=>p).ToList();
            //JobSeekingContext db = new JobSeekingContext();

            var dataJob = from jobs in db.UteworkJobs
                          join company in db.UtecomCompanies
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
