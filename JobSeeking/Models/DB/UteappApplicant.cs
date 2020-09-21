using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UteappApplicant
    {
        public UteappApplicant()
        {
            UteappAppCertificates = new HashSet<UteappAppCertificate>();
            UteappAppEducations = new HashSet<UteappAppEducation>();
            UteappAppSkills = new HashSet<UteappAppSkill>();
        }

        public int RecId { get; set; }
        public string CandidateCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AliasesName { get; set; }
        public string GenderId { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime? Birthday { get; set; }
        public string MaritalStatusId { get; set; }
        public string FormsOfTrainingId { get; set; }
        public string EducationalLevelId { get; set; }
        public string AcademicLevelId { get; set; }
        public string EmailAddress { get; set; }
        public string IdentityCardNo { get; set; }
        public DateTime? DateRange { get; set; }
        public DateTime? IssuedBy { get; set; }
        public string SpecialTraces { get; set; }
        public double? Height { get; set; }
        public double? Weight { get; set; }
        public string Health { get; set; }
        public string PathAvatar { get; set; }

        public virtual UtelsAcademicLevel AcademicLevel { get; set; }
        public virtual UtelsEducationalLevel EducationalLevel { get; set; }
        public virtual UtelsFormsOfTraining FormsOfTraining { get; set; }
        public virtual UtelsGender Gender { get; set; }
        public virtual UtelsMaritalStatu MaritalStatus { get; set; }
        public virtual UteappAppWorkProgress UteappAppWorkProgress { get; set; }
        public virtual ICollection<UteappAppCertificate> UteappAppCertificates { get; set; }
        public virtual ICollection<UteappAppEducation> UteappAppEducations { get; set; }
        public virtual ICollection<UteappAppSkill> UteappAppSkills { get; set; }
    }
}
