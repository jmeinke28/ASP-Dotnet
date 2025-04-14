using System.Text.Json.Serialization;
using PlotPocket.Server.Models.Responses;

public class Trending : ApiMediaItem
{
    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("first_air_date")]
    public string? FirstAirDate { get; set; }

    [JsonPropertyName("release_date")]
    public string? ReleaseDate { get; set; }

    [JsonPropertyName("media_type")]
    public string? MediaType { get; set; }

    [JsonPropertyName("title")]
    public string? Title { get; set; }
}
