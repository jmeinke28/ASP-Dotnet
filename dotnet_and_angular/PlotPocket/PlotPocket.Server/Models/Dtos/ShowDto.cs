namespace PlotPocket.Server.Models.Dtos
{
    public class ShowDto
    {
        public int ShowApiId { get; set; }
        public string? Type { get; set; }  
        public string? Title { get; set; }
        public DateTime? Date { get; set; } 
        public string? PosterPath { get; set; }
    }
}
