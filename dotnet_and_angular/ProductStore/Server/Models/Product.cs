using System.ComponentModel.DataAnnotations;

namespace Server.Models;

public class Project {
    [Key]
    public int Id { get; set; }

    [Required]
    public required string Name { get; set; }

    public string? Description { get; set; }

    [Required]
    public required decimal Price { get; set; }

    public bool IsAvailable {get; set; }
}