using AutoMapper;
using TrefleApp.Server.Models.Trefle.Responses;
using TrefleApp.Server.Models.Trefle.Dtos;

public class PlantProfile : Profile {
    public PlantProfile() {
        CreateMap<PlantDto, Plant>().ReverseMap();        
    }
}
