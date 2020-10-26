namespace JobSeeking.Models.DB
{
    public partial class UteappAppCertificate
    {
        public int RecId { get; set; }
        public string CandidateCode { get; set; }
        public string CertificateId { get; set; }
        public string Description { get; set; }

        public virtual UteappApplicant CandidateCodeNavigation { get; set; }
        public virtual UtelsCertificate Certificate { get; set; }
    }
}
