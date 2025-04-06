public class GameDto
{
    public int Id { get; set; }
    public string? UserId { get; set; }
    public string? Status { get; set; }
    public string? View { get; set; } // This is the 'phrase' in the frontend.
    public int RemainingGuesses { get; set; }
    public string? Answer { get; set; } // Added Answer for the game
}
