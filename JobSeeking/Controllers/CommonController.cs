using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobSeeking.Models.Class;
using JobSeeking.Models.DB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobSeeking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonController : ControllerBase
    {
        private readonly JobSeekingContext _context;
        public CommonController(JobSeekingContext context)
        {
            _context = context;

        }
        [HttpGet("Get")]
        //[Authorize(Policy = Policies.Recruiter)]
        public async Task<object> GetHeader(int CompanyID,int IsCompany)
        {
            var data = await _context.FormHeaderCompanys.FromSqlRaw("EXEC dbo.spUTE_GetHeaderForCompany {0},{1}", CompanyID, IsCompany).ToListAsync();
            var headerCompany = data.AsEnumerable().SingleOrDefault();
            return headerCompany;
        }
        [HttpGet("GetListCompanyTop")]
        public async Task<object> GetListCompanyTop()
        {
            var data = await _context.ListCompanyTops.FromSqlRaw("EXEC dbo.UTE_Company_GetCompanyTop").ToListAsync();
            return data;
        }
        [HttpGet("GetTags")]
        //[Authorize(Policy = Policies.Recruiter)]
        public async Task<object> GetTags(int CompanyID)
        {
            var data = await _context.UtelsTags.Where(p => p.Major == 1).ToListAsync();
            return data;
        }

        [HttpGet("GetListCandidateApply")]
        [Authorize(Policy = Policies.Recruiter)]
        public async Task<object> GetListCandidateApply(int JobID, bool IsSearch)
        {
            var data = await _context.ListCandidateApplys.FromSqlRaw("EXEC dbo.UTE_spGetListCandidateByJobID {0},{1}", JobID, IsSearch).ToListAsync();
            return data;
        }
        [HttpGet("ListSearch")]
        public async Task<object> ListSearch()
        {
            var ListJobSkill = await _context.ValueListStrings.FromSqlRaw("EXEC dbo.spUTE_GetComboboxSearch {0},{1}", "UTELS_GetJobSkill", "VN").ToListAsync();
            foreach (ValueListString element in ListJobSkill)
            {
                element.value += "JS";
            }
            var ListJobTitle = await _context.ValueListStrings.FromSqlRaw("EXEC dbo.spUTE_GetComboboxSearch {0},{1}", "UTELS_GetJobTitle", "VN").ToListAsync();
            foreach (ValueListString element in ListJobTitle)
            {
                element.value += "JT";
            }
            var ListCompany = await _context.ValueListStrings.FromSqlRaw("EXEC dbo.spUTE_GetComboboxSearch {0},{1}", "UTELS_GetCompany", "VN").ToListAsync();
            foreach (ValueListString element in ListCompany)
            {
                element.value += "CP";
            }
            var Province = await _context.ValueListStrings.FromSqlRaw("EXEC dbo.spUTE_GetComboboxSearch {0},{1}", "UTELS_GetProvince", "VN").ToListAsync();
            //foreach (ValueListString element in ListCompany)
            //{
            //    element.value += "CP";
            //}
            ValueListString localtionAll = new ValueListString() { label="Tất cả địa điểm",value="-1"};

            Province.Insert(0, localtionAll);

            var arlist2 = new ArrayList()
                {
                    ListJobSkill, ListJobTitle,ListCompany,Province
                };
            return arlist2;
        }



    }
}
