using AutoMapper;
using angular7_aspcore.Models;
using DTO = angular7_aspcore.Models.DTOs;

namespace angular7_aspcore
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, DTO.UserDto>();
            CreateMap<DTO.UserDto, User>();
        }
    }    
}