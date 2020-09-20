using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UtelsSkills
    {
        public UtelsSkills()
        {
            UteappAppSkills = new HashSet<UteappAppSkills>();
        }

        public int RecId { get; set; }
        public string SkillId { get; set; }
        public string SkillName { get; set; }
        public string SkillName2 { get; set; }

        public virtual ICollection<UteappAppSkills> UteappAppSkills { get; set; }
    }
}
