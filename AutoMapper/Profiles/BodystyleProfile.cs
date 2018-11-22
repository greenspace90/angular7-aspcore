using System;
using System.Collections.Generic;
using System.Linq;
using angular7_aspcore.Models;
using AutoMapper;
using angular7_aspcore.AutoMapper.Helpers;
using DTO = angular7_aspcore.Models.DTOs;
using Model = angular7_aspcore.Models;
using contact_app.Controllers;

namespace angular7_aspcore.AutoMapper.Profiles {
    public class BodystyleProfile : Profile {
        public BodystyleProfile () {
            CreateMap<Model.Type, DTO.Bodystyle> ()
            .Include<Model.Bodystyle, DTO.Bodystyle> ()
            .ForMember(dest => dest.disableDelete, opt => opt.Ignore());
            CreateMap<Model.Bodystyle, DTO.Bodystyle> ()
            .ForMember (dest => dest.disableDelete, opt => opt.ResolveUsing<CustomResolver>());
        }
    }
}