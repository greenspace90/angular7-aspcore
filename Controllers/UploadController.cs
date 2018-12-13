using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net.Http.Headers;
// using Newtonsoft.Json;

namespace contact_app.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UploadController : Controller    
    {
        private IHostingEnvironment _hostingEnvironment;

        public UploadController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost("{make}"), DisableRequestSizeLimit]
        public ActionResult UploadFile(string make)
        {
            try
            {
                var file = Request.Form.Files[0];
                // string folderName = make;
                string webRootPath = _hostingEnvironment.ContentRootPath;
                string newPath = $"{_hostingEnvironment.ContentRootPath}\\ContactApp\\src\\assets\\{make}";
                // string newPath = Path.Combine(webRootPath, folderName);
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }
                if (file.Length > 0)
                {
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string fullPath = Path.Combine(newPath, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }
                return Json("Upload Successful.");
            }
            catch (System.Exception ex)
            {
                return Json("Upload Failed: " + ex.Message);
            }
        }
    }
}