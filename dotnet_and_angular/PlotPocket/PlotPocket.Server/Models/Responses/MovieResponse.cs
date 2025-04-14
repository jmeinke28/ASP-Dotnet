using System.Collections.Generic;
using System.Text.Json.Serialization;
using PlotPocket.Server.Models.Responses;

namespace PlotPocket.Server.Models.Responses
{
    public class MovieResponse
    {
        [JsonPropertyName("results")]
        public List<Movie> Results { get; set; } = new List<Movie>();
    }
}
