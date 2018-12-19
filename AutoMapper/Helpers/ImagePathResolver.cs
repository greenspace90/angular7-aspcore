using System;
using System.Collections.Generic;
using System.Linq;
using angular7_aspcore.AutoMapper.Helpers;
using AutoMapper;
using Models = angular7_aspcore.Models;
using DTO = angular7_aspcore.Models.DTOs;
using Microsoft.AspNetCore.Hosting;

namespace angular7_aspcore.AutoMapper.Helpers {
    public class ImagePathResolver : IValueResolver<Models.Vehicle, DTO.VehicleDTO, string> {
        private IHostingEnvironment _hostingEnvironment;

        public ImagePathResolver(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public string Resolve (Models.Vehicle source, DTO.VehicleDTO destination, string destmember, ResolutionContext context) {
            // string FullPath = $"{_hostingEnvironment.ContentRootPath}/ContactApp/src/assets/{source.imagePath}";
            string FullPath = $"../../../assets/{source.make}/{source.imagePath}";
            return FullPath;
        }
    }
}