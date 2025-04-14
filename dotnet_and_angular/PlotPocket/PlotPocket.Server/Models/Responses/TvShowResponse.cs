using System.Text.Json.Serialization;

namespace PlotPocket.Server.Models.Responses;

public class TvShowResponse
{
    [JsonPropertyName("results")]
    public List<TvShow> Results { get; set; } = new List<TvShow>();
}
