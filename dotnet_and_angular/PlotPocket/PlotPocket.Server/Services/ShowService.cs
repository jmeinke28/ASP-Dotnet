using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using AutoMapper;
using PlotPocket.Server.Data; // Adjust based on where ApplicationDbContext is located
using PlotPocket.Server.Models.Dtos;
using PlotPocket.Server.Models.Entities;
using PlotPocket.Server.Models.Responses;
using RestSharp;

namespace PlotPocket.Server.Services
{
    public class ShowService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public ShowService(
            ApplicationDbContext context,
            IConfiguration configuration,
            IMapper mapper
        )
        {
            _context = context;
            _configuration = configuration;
            _mapper = mapper;
        }

        public ShowDto MediaItemToShowDto(ApiMediaItem mediaItem, string? userId)
        {
            string? dateToParse = mediaItem switch
            {
                Movie movie => movie.ReleaseDate,
                TvShow tvShow => tvShow.FirstAirDate,
                Trending trendingShow => trendingShow.ReleaseDate ?? trendingShow.FirstAirDate,
                _ => null,
            };

            var date = DateTime.TryParse(dateToParse, out DateTime parsedDate)
                ? parsedDate
                : (DateTime?)null;

            int existingShowId = ShowExistsForLoggedInUser(mediaItem.Id, userId);

            string? title;
            if (mediaItem is Trending trendingMedia)
            {
                title =
                    trendingMedia.MediaType == "movie" ? trendingMedia.Title : trendingMedia?.Name;
            }
            else
            {
                title = (mediaItem as Movie)?.Title ?? (mediaItem as TvShow)?.Name;
            }

            // Fallback if PosterPath is null
            string? posterPath = mediaItem.PosterPath ?? "/default-poster.jpg"; // Replace with a default value or empty string

            return new ShowDto
            {
                Id = existingShowId,
                ShowApiId = mediaItem.Id,
                Type = mediaItem is Trending trendingItem
                    ? trendingItem.MediaType
                    : (mediaItem is Movie ? "Movie" : "TV Show"),
                Title = title,
                Date = date,
                PosterPath = posterPath,
            };
        }

        public ShowDto ShowToShowDto(Show show)
        {
            return _mapper.Map<ShowDto>(show);
        }

        public ShowDto MovieToShowDto(Movie movie, string? userId)
        {
            var date = ParseDate(movie.ReleaseDate);

            int existingShowId = ShowExistsForLoggedInUser(movie.Id, userId);

            return new ShowDto
            {
                Id = existingShowId,
                ShowApiId = movie.Id,
                Type = "Movie",
                Title = movie.Title,
                Date = date,
                PosterPath = movie.PosterPath,
            };
        }

        public ShowDto TvShowToShowDto(TvShow tvShow, string? userId)
        {
            var date = ParseDate(tvShow.FirstAirDate);

            int existingShowId = ShowExistsForLoggedInUser(tvShow.Id, userId);

            return new ShowDto
            {
                Id = existingShowId,
                ShowApiId = tvShow.Id,
                Type = "TV Show",
                Title = tvShow.Name,
                Date = date,
                PosterPath = tvShow.PosterPath,
            };
        }

        public int ShowExistsForLoggedInUser(int showApiId, string? userId)
        {
            int existingShowId = 0;
            if (null != userId)
            {
                var show = _context.Shows.Where(s => s.ShowApiId == showApiId).FirstOrDefault();
                if (null != show)
                {
                    existingShowId = show.Id;
                }
            }

            return existingShowId;
        }

        private DateTime? ParseDate(string? dateToParse)
        {
            DateTime? date = DateTime.TryParse(dateToParse, out DateTime parsedDate)
                ? parsedDate
                : (DateTime?)null;
            return date;
        }
    }
}
