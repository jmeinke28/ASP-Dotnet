using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Game
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public ApplicationUser User { get; set; }

    [Required]
    public string Status { get; set; } = "Unfinished";

    [Required]
    public string Target { get; set; }

    public string Guesses { get; set; }

    [Required]
    public string View { get; set; }

    [Required]
    public int RemainingGuesses { get; set; } = 8;
}
