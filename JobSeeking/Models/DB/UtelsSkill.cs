using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UtelsSkill
    {
        public UtelsSkill()
        {
            UteappAppSkills = new HashSet<UteappAppSkill>();
        }

        public int RecId { get; set; }
        public string SkillId { get; set; }
        public string SkillName { get; set; }
        public string SkillName2 { get; set; }

        public virtual ICollection<UteappAppSkill> UteappAppSkills { get; set; }
    }
}
