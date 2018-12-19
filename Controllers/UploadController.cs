using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using DTO = angular7_aspcore.Models.DTOs;

namespace contact_app.Controllers {
    [Produces ("application/json")]
    [Route ("api/[controller]")]
    public class UploadController : Controller {
        private IHostingEnvironment _hostingEnvironment;

        public UploadController (IHostingEnvironment hostingEnvironment) {
            _hostingEnvironment = hostingEnvironment;
        }

        // [HttpPost]
        // [DisableRequestSizeLimit]
        // public ActionResult UploadFile()
        // {
        //     try
        //     {
        //         var file = Request.Form.Files[0];
        //         var make = Request.Form.Files[1].ToString();
        //         var result = JsonConvert.DeserializeObject<DTO.MakeDTO>(make);
        //         // string folderName = make;
        //         // string make = "ford";
        //         string webRootPath = _hostingEnvironment.ContentRootPath;
        //         string newPath = $"{_hostingEnvironment.ContentRootPath}\\ContactApp\\src\\assets\\{make}";
        //         // string newPath = Path.Combine(webRootPath, folderName);
        //         if (!Directory.Exists(newPath))
        //         {
        //             Directory.CreateDirectory(newPath);
        //         }
        //         if (file.Length > 0)
        //         {
        //             string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
        //             string fullPath = Path.Combine(newPath, fileName);
        //             using (var stream = new FileStream(fullPath, FileMode.Create))
        //             {
        //                 file.CopyTo(stream);
        //             }
        //         }
        //         return Json("Upload Working Successfully.");
        //     }
        //     catch (System.Exception ex)
        //     {
        //         return Json("Upload Failed: " + ex.Message);
        //     }
        // }

        // [HttpPost]
        // [DisableRequestSizeLimit]
        // public IActionResult Upload (
        //     [ModelBinder (BinderType = typeof (JsonModelBinder))] DTO.MakeDTO value,
        //     IList<IFormFile> files) {
        //     // [ModelBinder (BinderType = typeof (JsonModelBinder))] DTO.MakeDTO value) {
        //     // Use serialized json object 'value'
        //     // Use uploaded 'files'
        //     try {
        //         // var file = Request.Form.Files[0];
        //         var file = files[0];
        //         // string folderName = make;
        //         // string make = "ford";
        //         string webRootPath = _hostingEnvironment.ContentRootPath;
        //         string newPath = $"{_hostingEnvironment.ContentRootPath}\\ContactApp\\src\\assets\\{value.Key}";
        //         // string newPath = Path.Combine(webRootPath, folderName);
        //         if (!Directory.Exists (newPath)) {
        //             Directory.CreateDirectory (newPath);
        //         }
        //         if (file.Length > 0) {
        //             string fileName = ContentDispositionHeaderValue.Parse (file.ContentDisposition).FileName.Trim ('"');
        //             string fullPath = Path.Combine (newPath, fileName);
        //             using (var stream = new FileStream (fullPath, FileMode.Create)) {
        //                 file.CopyTo (stream);
        //             }
        //         }
        //         return Json ("Upload Working Successfully.");
        //     } catch (System.Exception ex) {
        //         return Json ("Upload Failed: " + ex.Message);
        //     }

        // }

        public IActionResult Upload (DTO.FormFileWrapper modelWrapper) {
            try {
                // var file = Request.Form.Files[0];
                var file = modelWrapper.Files[0];
                // string folderName = make;
                // string make = "ford";
                string webRootPath = _hostingEnvironment.ContentRootPath;
                string newPath = $"{_hostingEnvironment.ContentRootPath}\\ContactApp\\src\\assets\\{modelWrapper.MakeDTO.Key}";
                // string newPath = Path.Combine(webRootPath, folderName);
                if (!Directory.Exists (newPath)) {
                    Directory.CreateDirectory (newPath);
                }
                if (file.Length > 0) {
                    string fileName = ContentDispositionHeaderValue.Parse (file.ContentDisposition).FileName.Trim ('"');
                    string fullPath = Path.Combine (newPath, fileName);
                    using (var stream = new FileStream (fullPath, FileMode.Create)) {
                        file.CopyTo (stream);
                    }
                }
                return Json ("Upload Working Successfully.");
            } catch (System.Exception ex) {
                return Json ("Upload Failed: " + ex.Message);
            }
        }
    }
}
