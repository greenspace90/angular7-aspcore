using AutoMapper;
using angular7_aspcore.Models;

namespace  angular7_aspcore.AutoMapper.Profiles
{
    public class SettingsProfile : Profile
    {
        public SettingsProfile()
        {
            CreateMap<Settings, Settings>();
        }
    }    
}