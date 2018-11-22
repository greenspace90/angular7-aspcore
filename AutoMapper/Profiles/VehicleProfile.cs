using AutoMapper;
using angular7_aspcore.Models;
using DTO = angular7_aspcore.Models.DTOs;

namespace  angular7_aspcore.AutoMapper.Profiles
{
    public class VehicleProfile : Profile
    {
        public VehicleProfile()
        {
            // DTOs -> Models
            CreateMap<DTO.Vehicle, Vehicle>();
        }
    }    
}
