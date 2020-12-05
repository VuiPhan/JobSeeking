namespace JobSeeking.Models.Class
{
    public class PublishedRecuitForm
    {
        public string Title { get; set; }
        public string RequireCV { get; set; }
        public string JobDescriptions { get; set; }
        public string Strengths { get; set; }
        public string PriorityDegree { get; set; }
        public string ReasonsToJoin { get; set; }
        public string LoveWorkingHere { get; set; }

        public int SalaryFrom { get; set; }

        public int SalaryTo { get; set; }

        public string WorkLocation { get; set; }

        public string OTMode { get; set; }
        public string JobSkillIDs { get; set; }
        public string JobTitleIDs { get; set; }
        public string JobLocations { get; set; }
        public int JobID { get; set; }


    }
}
