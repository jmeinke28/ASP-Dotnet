using System.Text.Json.Serialization;

namespace TrefleApp.Server.Models.Trefle.Responses;

public class PlantResponse {
    [JsonPropertyName("data")]
    public Plant? Data { get; set; }

    [JsonPropertyName("meta")]
    public SinglePlantMeta? Meta { get; set; }

}

public class PlantListResponse {
    [JsonPropertyName("data")]
    public List<Plant> Data { get; set; } = new List<Plant>();
    
    [JsonPropertyName("links")]
    public Links? Links { get; set; }

    [JsonPropertyName("meta")]
    public PlantListMeta? Meta { get; set; }

}

public class Links {
    [JsonPropertyName("self")]
    public string? Self { get; set; }

    [JsonPropertyName("first")]
    public string? First { get; set; }

    [JsonPropertyName("next")]
    public string? Next { get; set; }

    [JsonPropertyName("last")]
    public string? Last { get; set; }
}

public class PlantListMeta {
    [JsonPropertyName("total")]
    public int Total { get; set; }
}

public class SinglePlantMeta {
    [JsonPropertyName("last_modified")]
    public DateTime? LastModified { get; set; }
}

public class Plant {
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("common_name")]
    public string? CommonName { get; set; }

    [JsonPropertyName("slug")]
    public string? Slug { get; set; }

    [JsonPropertyName("scientific_name")]
    public string? ScientificName { get; set; }

    [JsonPropertyName("year")]
    public int Year { get; set; }

    [JsonPropertyName("author")]
    public string? Author { get; set; }

    [JsonPropertyName("genus_id")]
    public int GenusId { get; set; }

    [JsonPropertyName("image_url")]
    public string? ImageUrl { get; set; }

}