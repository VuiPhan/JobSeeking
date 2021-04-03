using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace JobSeeking.Common
{
    public class LoginInfoSingleton : ControllerBase
    {
        public LoginInfo GetInfoLogin()
        {
            LoginInfo loginInfo = new LoginInfo();
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claims = identity.Claims.ToList();
            loginInfo.CadidateCode = claims[5].Value.ToString() == "" ? 0 : Int32.Parse(claims[5].Value.ToString());
            loginInfo.companyID = claims[4].Value.ToString() == "" ? 0 : Int32.Parse(claims[4].Value.ToString());
            loginInfo.UserID =  claims[1].Value.ToString() == "" ? 0 : Int32.Parse(claims[1].Value.ToString());
            return loginInfo;
        }
    }
}
