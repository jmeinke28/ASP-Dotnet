public class GameDto
{
    public int Id { get; set; }
    public string? UserId { get; set; }
    public string? Status { get; set; }
    public string? Guesses { get; set; }
    public string? Phrase { get; set; } 
    public int RemainingGuesses { get; set; }
    public string? Answer { get; set; }
}