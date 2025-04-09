using Microsoft.AspNetCore.Mvc;
using PlotPocket.Server.Services;

namespace PlotPocket.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TvShowsController : ControllerBase
    {
        private readonly TMDBService _tmdbService;

        public TvShowsController(TMDBService tmdbService)
        {
            _tmdbService = tmdbService;
        }

        [HttpGet("airing-today")]
        public async Task<IActionResult> GetAiringToday()
        {
            var shows = await _tmdbService.GetAiringTodayTvShowsAsync();
            return Ok(shows);
        }

        [HttpGet("top-rated")]
        public async Task<IActionResult> GetTopRated()
        {
            var shows = await _tmdbService.GetTopRatedTvShowsAsync();
            return Ok(shows);
        }

        [HttpGet("popular")]
        public async Task<IActionResult> GetPopular()
        {
            var shows = await _tmdbService.GetPopularTvShowsAsync();
            return Ok(shows);
        }
    }
}
