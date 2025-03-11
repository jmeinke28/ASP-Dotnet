using TrefleApp.Server.Models.Trefle.Responses;

namespace TrefleApp.Server.Services;

public class TrefleService {
    private readonly TrefleApiService _trefleApiService;

    public TrefleService(TrefleApiService trefleApiService) {
        _trefleApiService = trefleApiService;
    }

    public async Task<Plant?> GetPlantById(int plantId) {
        PlantResponse? plantResponse = await _trefleApiService.GetPlantById(plantId);

        return plantResponse.Data;
    }
    
    public async Task<ICollection<Plant>?> GetPlants() {
        PlantListResponse? plantListResponse = await _trefleApiService.GetPlants();

        return plantListResponse.Data;
    }

}