using System.Text.Json.Serialization;
using System;
using System.Collections.Generic;
using PlotPocket.Server.Models.Responses;

namespace PlotPocket.Server.Models.Responses
{
    public class TvShow : ApiMediaItem
    {
    
        [JsonPropertyName("name")]
        public string? Name { get; set; }

        [JsonPropertyName("first_air_date")]
        public string? FirstAirDate { get; set; }
    }
}
