using System.Text.Json.Serialization;
using System.Collections.Generic;
using PlotPocket.Server.Models.Responses;

namespace PlotPocket.Server.Models.Responses
{
    public class MovieResponse
    {
        [JsonPropertyName("results")]
        public List<Movie> Results { get; set; } = new List<Movie>();

        [JsonPropertyName("page")]
        public int Page { get; set; }

        [JsonPropertyName("total_results")]
        public int TotalResults { get; set; }

        [JsonPropertyName("total_pages")]
        public int TotalPages { get; set; }
    }
}