using System.Text.Json.Serialization;

namespace PlotPocket.Server.Models.Responses;

public class TvShowResponse {
    [JsonPropertyName("results")]
    public List<TvShow> Results { get; set; } = new List<TvShow>();

    [JsonPropertyName("page")]
    public int Page { get; set; }

    [JsonPropertyName("total_results")]
    public int TotalResults { get; set; }

    [JsonPropertyName("total_pages")]
    public int TotalPages { get; set; }
}