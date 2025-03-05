using System.Text.Json;
using RestSharp;

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

    public async Task GetPlantById(int plantId) {
        var request = new RestRequest($"/plants/{plantId}?token={_apiKey}")
            .AddHeader("accept", "application/json");

        var response = await _restClient.GetAsync(request);

        Console.WriteLine(response.Content);        
    }


}