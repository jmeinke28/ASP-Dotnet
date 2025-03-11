using System.Text.Json;
using RestSharp;
using TrefleApp.Server.Models.Trefle.Responses;

namespace TrefleApp.Server.Services;

public class TrefleApiService {
    /*
        - make API requests
            - needs where api is & api key
    */
    private readonly RestClient _restClient;
    private readonly string? _apiKey;
    private readonly string? _baseUrl;

    public TrefleApiService(IConfiguration config){
        _apiKey = config["Trefle:ApiKey"];
        _baseUrl = config["Trefle:BaseUrl"] ?? "";
        _restClient = new RestClient(_baseUrl);
    }

    public async Task<PlantResponse?> GetPlantById(int plantId) {
        var request = new RestRequest($"/plants/{plantId}?token={_apiKey}")
            .AddHeader("accept", "application/json");

        var response = await _restClient.GetAsync(request);

        return JsonSerializer.Deserialize<PlantResponse>(response.Content);  
    }


    public async Task<PlantListResponse?> GetPlants() {
        var request = new RestRequest($"/plants?token={_apiKey}")
            .AddHeader("accept", "application/json");

        var response = await _restClient.GetAsync(request);

        return JsonSerializer.Deserialize<PlantListResponse>(response.Content);  
    }

}