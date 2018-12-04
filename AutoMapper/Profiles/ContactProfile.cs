using AutoMapper;
using angular7_aspcore.Models;
using DTO = angular7_aspcore.Models.DTOs;

namespace  angular7_aspcore.AutoMapper.Profiles
{
    public class ContactProfile : Profile
    {
        public ContactProfile()
        {
            // DTOs -> Models
            CreateMap<DTO.Contact, Contact>();
        }
    }    
}

