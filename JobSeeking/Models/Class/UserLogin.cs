namespace JobSeeking.Models.Class
{
    public class UserLogin
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Address { get; set; }

        public int UserID { get; set; }
        public int UserLoginDB { get; set; }

        public string Roles { get; set; }

        public string MessageError { get; set; }


    }
}
