using Microsoft.AspNetCore.Mvc;
using PlotPocket.Server.Services;

namespace PlotPocket.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrendingController : ControllerBase
    {
        private readonly TMDBService _tmdbService;

        public TrendingController(TMDBService tmdbService)
        {
            _tmdbService = tmdbService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetTrendingAll([FromQuery] string timeWindow = "day")
        {
            var trending = await _tmdbService.GetTrendingShowsAsync(timeWindow);
            return Ok(trending);
        }

        [HttpGet("movies")]
        public async Task<IActionResult> GetTrendingMovies([FromQuery] string timeWindow = "day")
        {
            var movies = await _tmdbService.GetTrendingMoviesAsync(timeWindow);
            return Ok(movies);
        }

        [HttpGet("tv")]
        public async Task<IActionResult> GetTrendingTv([FromQuery] string timeWindow = "day")
        {
            var tv = await _tmdbService.GetTrendingTvShowsAsync(timeWindow);
            return Ok(tv);
        }
    }
}
