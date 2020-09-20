using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UtesysInformationDatabase
    {
        public int RecId { get; set; }
        public string TableName { get; set; }
        public string Description { get; set; }
    }
}
