using System.ComponentModel.DataAnnotations;

namespace PlotPocket.Server.Models.Entities;

public class Show
{
    [Key]
    public int Id { get; set; } = 0;
    public int ShowApiId { get; set; }
    public string? Type { get; set; }
    public string? Title { get; set; }
    public DateTime? Date { get; set; }
    public string? PosterPath { get; set; }

    public virtual ICollection<ApplicationUser>? Users { get; set; }
}
