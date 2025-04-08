using System.Text.Json.Serialization;
using System;
using System.Collections.Generic;
using PlotPocket.Server.Models.Responses;

namespace PlotPocket.Server.Models.Responses
{
    public class TvShow : ApiMediaItem
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("overview")]
        public string Overview { get; set; }

        [JsonPropertyName("first_air_date")]
        public DateTime? FirstAirDate { get; set; }

        [JsonPropertyName("genre_ids")]
        public List<int> GenreIds { get; set; } = new List<int>();

        [JsonPropertyName("poster_path")]
        public string? PosterPath { get; set; }  

        [JsonPropertyName("backdrop_path")]
        public string? BackdropPath { get; set; }  

        [JsonPropertyName("vote_average")]
        public double VoteAverage { get; set; }

        [JsonPropertyName("vote_count")]
        public int VoteCount { get; set; }
    }
}
