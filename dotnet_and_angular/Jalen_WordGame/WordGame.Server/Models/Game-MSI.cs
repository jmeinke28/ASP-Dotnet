using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WordGame.Models; 


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

    public string Guesses {get; set;} = "";

    [Required]
    public string? View { get; set; }

    [Required]
    public int RemainingGuesses { get; set; } = 8;

    public GameDto GetGameDto(){
        string answer = Status != "Unfinished" ? Target : "";
        return new GameDto{
            Id = Id,
            UserId = UserId,
            Status = Status,
            Phrase = View ?? string.Empty,
            RemainingGuesses = RemainingGuesses,
            Answer = answer,
            Guesses = Guesses ?? string.Empty
        };
    }
}
