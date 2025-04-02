using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WordGame.Models; // Add this line if it's not already there


public class Game
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string? UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public ApplicationUser? User { get; set; }

    [Required]
    public string Status { get; set; } = "Unfinished";

    [Required]
    public string? Target { get; set; }

    public ICollection<string> Guesses { get; set; } = new List<string>();

    [Required]
    public string? View { get; set; }

    [Required]
    public int RemainingGuesses { get; set; } = 8;
}
