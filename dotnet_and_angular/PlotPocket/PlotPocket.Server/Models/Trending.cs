using System.Text.Json.Serialization;
using PlotPocket.Server.Models.Responses;

public class Trending : ApiMediaItem {

    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("first_air_date")]
    public DateTime? FirstAirDate { get; set; }  

    [JsonPropertyName("release_date")]
    public DateTime? ReleaseDate { get; set; } 
}