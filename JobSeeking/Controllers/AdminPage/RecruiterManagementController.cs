using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using JobSeeking.Common;
using JobSeeking.Models.Class;
using JobSeeking.Models.DB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace JobSeeking.Controllers.AdminPage
{
    [Route("api/[controller]")]
    [Authorize(Policy = Policies.Admin)]
    [ApiController]
    public class RecruiterManagementController : ControllerBase
    {
        private readonly JobSeekingContext _context;
        public RecruiterManagementController(JobSeekingContext context)
        {
            _context = context;
        }
        [HttpGet("Get_InfomationCompany")]
        public async Task<object> Get_InfomationCompany()
        {
            List<Admin_InfomationCompany> lstInfomationCompany = new List<Admin_InfomationCompany>();
            try
            {
                lstInfomationCompany = await _context.Admin_InfomationCompanys.FromSqlRaw("EXEC dbo.UTE_Admin_GetInfomationCompany").ToListAsync();
            }
            catch (Exception e)
            {

            }
            return lstInfomationCompany;
        }
        [HttpPost("UpdateStatusOfAccount")]
        public async Task<object> UpdateStatusOfAccount(int? companyID,int? status)
        {
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_Admin_UpdateStatusOfAccount" +
            " @CompanyID={0},@Status={1}",
            companyID,
            status
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
        [HttpPost("PayMoneyForCompany")]
        public async Task<object> PayMoneyForCompany(int? companyID, int? money)
        {
            var result = await _context.Database.ExecuteSqlRawAsync("dbo.UTE_Admin_PaymentForCompany" +
            " @CompanyID={0},@MoneyPayment={1}",
            companyID,
            money
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
