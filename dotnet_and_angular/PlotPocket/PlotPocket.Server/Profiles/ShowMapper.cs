using AutoMapper;
using PlotPocket.Server.Models.Dtos;
using PlotPocket.Server.Models.Entities;

public class ShowMapper : Profile {
    public ShowMapper() {
        CreateMap<Show, ShowDto>();
    }
}