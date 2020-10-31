using JobSeeking.Models.Class;
using JobSeeking.Models.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobSeeking.Common
{
    public class HandleLogin
    {
        private readonly JobSeekingContext _context;
        public HandleLogin(JobSeekingContext context)
        {
            _context = context;
        }
       
    }
}
