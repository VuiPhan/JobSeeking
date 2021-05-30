using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobSeeking.Common;
using JobSeeking.Models.Class;
using JobSeeking.Models.DB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobSeeking.Controllers.AdminPage
{
    [Route("api/[controller]")]
    [Authorize(Policy = Policies.Admin)]
    [ApiController]
    public class TemplateEmailAdminController : ControllerBase
    {
        private readonly JobSeekingContext _context;
        public TemplateEmailAdminController(JobSeekingContext context)
        {
            _context = context;
        }
        [HttpGet("GetAll_TemplateEmailAdmin")]
        [Authorize(Policy = Policies.Admin)]
        public async Task<object> GetAll_TemplateEmailAdmin()
        {
              
            List<NumberViewDashboardCard> numberViewDashboardCard = new List<NumberViewDashboardCard>();
            try
            {
                numberViewDashboardCard = await _context.NumberViewDashboardCards.FromSqlRaw("EXEC dbo.UTE_SYS_Statistics_ViewDashboardCard").ToListAsync();
            }
            catch (Exception e)
            {

            }
            return numberViewDashboardCard;
        }
    }
}
