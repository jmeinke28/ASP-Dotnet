public class GameDto {
    public int Id { get; set; } // This maps to gameId
    public string? Target { get; set; } // This maps to phrase
    public int RemainingGuesses { get; set; } // This stays the same
    public string? View { get; set; } // This could map to the phrase with blanks
    public string Status { get; set; } // This maps to gameStatus
}
