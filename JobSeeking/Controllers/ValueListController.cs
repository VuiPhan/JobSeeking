using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using JobSeeking.Models.DB;
//using JobSeeking.Models.DB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult<Valuelist>> GetValueList(string nameValuelist)
        {
            //var list1 = _context.Database.("EXEC dbo.spUTE_GetValueList {0},{1}", nameValuelist,"VN").To;
            //var ValueList = _context.<Valuelist>(@"EXEC dbo.LoadValueList {0}", nameValuelist);
            //ValueList2 item = new ValueList2();

            //List<ValueList2> ListValueList = new List<ValueList2>();

            //var result = _context..FromSql
            //    ("SELECT * FROM [HumanResources].[Employee] Where SalariedFlag = 1").ToList();
            //foreach (ValueList2 c in ValueList)
            //{
            //    item = c;
            //    ListValueList.Add(c);
            //}
            var sql = "EXEC dbo.spUTE_GetValueList {0},{1}";
            var result = _context.Database.ExecuteSqlRaw(sql, nameValuelist, "VN");

            return StatusCode(201);
        }

        public class Valuelist
        {
            public int Value;
            public string Label;
        }

    }
}
