using Microsoft.AspNetCore.Authorization;
namespace JobSeeking.Models.Class
{
    public class Policies
    {
        public const string Admin = "Admin";
        public const string User = "User";
        public const string Recruiter = "Recruiter";
        public static AuthorizationPolicy AdminPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(Admin).Build();
        }
        public static AuthorizationPolicy UserPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(User).Build();
        }
        public static AuthorizationPolicy RecruiterPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(Recruiter).Build();
        }
    }
}

