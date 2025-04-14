using System.Text.Json.Serialization;

namespace PlotPocket.Server.Models.Responses;

public class TrendingResponse {

    [JsonPropertyName("results")]
    public List<Trending>? Results { get; set; }
}