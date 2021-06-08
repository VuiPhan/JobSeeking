using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using JobSeeking.Models.Class;
using JobSeeking.Models.DB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace JobSeeking.Controllers.Guest
{
    [Route("api/[controller]")]
    [ApiController]
    public class GuestController : ControllerBase
    {
        private readonly JobSeekingContext _context;
        public GuestController(JobSeekingContext context)
        {
            _context = context;

        }
        [HttpGet("ForgetPassword")]
        public async Task<object> ForgetPassword(string loginAccount)
        {
            var messageOutput = new SqlParameter("@Message", System.Data.SqlDbType.NVarChar, 500) 
                                    { Direction = System.Data.ParameterDirection.Output };
            var isSendOTPOutput = new SqlParameter();
            isSendOTPOutput.ParameterName = "@IsSendOTP";
            isSendOTPOutput.SqlDbType = SqlDbType.Bit;
            isSendOTPOutput.Direction = ParameterDirection.Output;
            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync(
            "EXEC dbo.UTE_SYS_spSendOTPByUser @LoginAccount={0},@Message={1} OUT, @IsSendOTP={2} OUT", loginAccount, messageOutput, isSendOTPOutput);
            }
            catch(Exception e)
            {

            }
            
            IActionResult response = Unauthorized();
            response = Ok(new { Message = messageOutput.Value, IsSendOTP = isSendOTPOutput.Value });
            return response;
        }
        [HttpGet("UpdatePassword")]
        public async Task<object> UpdatePassword(string loginAccount,string otp,string pass)
        {
            var messageOutput = new SqlParameter("@Message", System.Data.SqlDbType.NVarChar, 500)
            { Direction = System.Data.ParameterDirection.Output };
            var isUpdateSuccess = new SqlParameter();
            isUpdateSuccess.ParameterName = "@IsUpdateSuccess";
            isUpdateSuccess.SqlDbType = SqlDbType.Bit;
            isUpdateSuccess.Direction = ParameterDirection.Output;
            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync(
            "EXEC dbo.UTE_SYS_spUpdatePasswordByForget @LoginAccount={0},@Password={1}, @OTP={2},@Message={3} OUT,@IsUpdateSuccess={4} OUT", loginAccount, pass, otp, messageOutput, isUpdateSuccess);
            }
            catch (Exception e)
            {

            }
             IActionResult response = Unauthorized();
            response = Ok(new { Message = messageOutput.Value, IsUpdateSuccess = isUpdateSuccess.Value });
            return response;
        }
    }
}
