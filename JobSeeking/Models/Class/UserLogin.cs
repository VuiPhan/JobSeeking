﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobSeeking.Models.Class
{
    public class UserLogin
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Address { get; set; }

        public int UserID { get; set; }
        public string Roles { get; set; }

        public string MessageError { get; set; }


    }
}
