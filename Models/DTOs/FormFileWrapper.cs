using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using angular7_aspcore.Helpers;

namespace angular7_aspcore.Models.DTOs {
    public class FormFileWrapper {
        public IList<IFormFile> Files { get; set; }

        [FromJson]
        public MakeDTO MakeDTO { get; set; } // <-- JSON will be deserialized to this object
    }
}