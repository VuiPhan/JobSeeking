using JobSeeking.Models.Class;
using JobSeeking.Models.DB;
//using JobSeeking.Models.DB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JobSeeking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValueListController : ControllerBase
    {
        // static JobSeekingContext db = new JobSeekingContext();
        // GET api/values/5
        private readonly JobSeekingContext _context;
        public ValueListController(JobSeekingContext context)
        {
            _context = context;
        }

        [Obsolete]
        public async Task<Object> GetValueList(string nameValuelist)
        {
            List<ValueList> data = new List<ValueList>();
            data = await _context.ValueLists.FromSqlRaw("EXEC dbo.spUTE_GetValueList {0},{1}", nameValuelist, "VN").ToListAsync();
            return data;
        }
    }
}
