using System;
using System.Collections.Generic;

namespace JobSeeking.Models.DB
{
    public partial class UtelsCertificate
    {
        public UtelsCertificate()
        {
            UteappAppCertificate = new HashSet<UteappAppCertificate>();
        }

        public int RecId { get; set; }
        public string CertificateId { get; set; }
        public string CertificateName { get; set; }
        public string CertificateName2 { get; set; }
        public string Notes { get; set; }

        public virtual ICollection<UteappAppCertificate> UteappAppCertificate { get; set; }
    }
}
