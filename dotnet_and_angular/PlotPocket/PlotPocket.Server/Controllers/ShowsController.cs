using Microsoft.AspNetCore.Mvc;
using PlotPocket.Server.Services;

namespace PlotPocket.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowsController : ControllerBase
    {
        private readonly TMDBService _tmdbService;

        public ShowsController(TMDBService tmdbService)
        {
            _tmdbService = tmdbService;
        }

        [HttpGet("trending")]
        public async Task<IActionResult> GetTrending([FromQuery] string type = "all", [FromQuery] string timeWindow = "day")
        {
            if (type == "movie")
            {
                var result = await _tmdbService.GetTrendingMoviesAsync(timeWindow);
                return Ok(result);
            }

            if (type == "tv")
            {
                var result = await _tmdbService.GetTrendingTvShowsAsync(timeWindow);
                return Ok(result);
            }

            // Default to all types
            var all = await _tmdbService.GetTrendingShowsAsync(timeWindow);
            return Ok(all);
        }

        [HttpGet("now-playing")]
        public async Task<IActionResult> GetNowPlayingMovies()
        {
            var movies = await _tmdbService.GetNowPlayingMoviesAsync();
            return Ok(movies);
        }

        [HttpGet("top-rated-movies")]
        public async Task<IActionResult> GetTopRatedMovies()
        {
            var movies = await _tmdbService.GetTopRatedMoviesAsync();
            return Ok(movies);
        }

        [HttpGet("popular-movies")]
        public async Task<IActionResult> GetPopularMovies()
        {
            var movies = await _tmdbService.GetPopularMoviesAsync();
            return Ok(movies);
        }
    }
}
