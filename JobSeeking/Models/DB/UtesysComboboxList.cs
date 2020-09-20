using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UtesysComboboxList
    {
        public int RecId { get; set; }
        public string ComboxName { get; set; }
        public bool? IsTable { get; set; }
        public string TableName { get; set; }
        public string ColumName1 { get; set; }
        public string ColumName2 { get; set; }
        public string Language { get; set; }
    }
}
