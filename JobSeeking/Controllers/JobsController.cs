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
        public IEnumerable<UteworkJobs> Get()
        {
            var data = db.UteworkJobs.Select(p=>p).ToList();
            return data;
        }
    }
}
