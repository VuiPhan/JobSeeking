﻿using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UteappAccount
    {
        public int RecId { get; set; }
        public string UserId { get; set; }
        public string UserLogin { get; set; }
        public string Password { get; set; }
        public string Roles { get; set; }
    }
}
