using JobSeeking.Models.DB;
using Microsoft.AspNetCore.Mvc;

namespace JobSeeking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicantController : ControllerBase
    {
        [HttpPost("Post")]
        public IActionResult SaveDate([FromBody] UteappApplicant uteappApplicant)
        {

            return Ok();
        }
        [HttpGet("GetData")]
        public IActionResult SaveDate(int x)
        {

            return Ok();
        }




    }
}
