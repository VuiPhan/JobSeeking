namespace JobSeeking.Models.DB
{
    public partial class UteappAccount
    {
        public int UserId { get; set; }
        public string UserLogin { get; set; }
        public string Password { get; set; }
        public string Roles { get; set; }
    }
}
