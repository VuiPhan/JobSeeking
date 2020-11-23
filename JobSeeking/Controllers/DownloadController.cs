using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
namespace JobSeeking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DownloadController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Download()
        {
            var path = @"https://cdn.itviec.com/photos/39011/jd_photo_thumbnail/jd_photo_thumbnail-1537273.jpg?TKHL8117CQAD1rE2g5Gp8G5J";
            string variableName = "Trọn bộ EBOOK ĐỘC QUYỀN 2020.pdf";
            string source_dir = String.Format("D:\\{0}", variableName);
            var memory = new MemoryStream();
            using (var stream = new FileStream(source_dir, FileMode.Open))
            {
                await stream.CopyToAsync(memory);

            }
            memory.Position = 0;
            var ext = Path.GetExtension(source_dir).ToLowerInvariant();
            return File(memory, GetMineTypes()[ext], Path.GetFileName(source_dir));
        }
        private Dictionary<string,string> GetMineTypes()
        {
            return new Dictionary<string, string>
            {
                { ".pdf","application/pdf" },
                 { ".png","image/png" },
                 { ".jpg","image/jpg" },

            };
        }
    }
    

}
