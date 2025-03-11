using AutoMapper;
using TrefleApp.Server.Models.Trefle.Responses;
using TrefleApp.Server.Models.Trefle.Dtos;

namespace TrefleApp.Server.Services;

public class TrefleService {
    private readonly TrefleApiService _trefleApiService;
    private readonly IMapper _mapper;

    public TrefleService(
        TrefleApiService trefleApiService, 
        IMapper mapper
    ) {
        _trefleApiService = trefleApiService;
        _mapper = mapper;
    }

    public async Task<PlantDto?> GetPlantById(int plantId) {
        PlantResponse? plantResponse = await _trefleApiService.GetPlantById(plantId);

        return _mapper.Map<PlantDto>(plantResponse.Data);
    }
    
    public async Task<ICollection<PlantDto>?> GetPlants() {
        PlantListResponse? plantListResponse = await _trefleApiService.GetPlants();

        return _mapper.Map<ICollection<PlantDto>>(plantListResponse.Data);
    }

}