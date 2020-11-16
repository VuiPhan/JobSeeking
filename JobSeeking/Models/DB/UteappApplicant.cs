using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UteappApplicant
    {
        public UteappApplicant()
        {
            UteappAppCertificates = new HashSet<UteappAppCertificate>();
            UteappAppSkills = new HashSet<UteappAppSkill>();
        }

        public int CandidateCode { get; set; }
        public int? UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AliasesName { get; set; }
        public int? GenderId { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime? Birthday { get; set; }
        public string FormsOfTrainingId { get; set; }
        public string EducationalLevelId { get; set; }
        public int? AcademicLevelId { get; set; }
        public string EmailAddress { get; set; }
        public string IdentityCardNo { get; set; }
        public DateTime? DateRange { get; set; }
        public DateTime? IssuedBy { get; set; }
        public string SpecialTraces { get; set; }
        public string PathAvatar { get; set; }

        public virtual UteappAppEducation UteappAppEducation { get; set; }
        public virtual UteappAppWorkProgress UteappAppWorkProgress { get; set; }
        public virtual ICollection<UteappAppCertificate> UteappAppCertificates { get; set; }
        public virtual ICollection<UteappAppSkill> UteappAppSkills { get; set; }
    }
}
