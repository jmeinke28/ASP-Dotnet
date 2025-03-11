namespace TrefleApp.Server.Models.Trefle.Dtos;

public class PlantDto {    
    public int Id { get; set; }
    
    public string? CommonName { get; set; }
    
    public string? Slug { get; set; }
    
    public string? ScientificName { get; set; }
    
    public int Year { get; set; }
    
    public string? Author { get; set; }
    
    public int GenusId { get; set; }
    
    public string? ImageUrl { get; set; }

}