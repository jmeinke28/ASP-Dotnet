using Microsoft.AspNetCore.Mvc;
using PlotPocket.Server.Services;

namespace PlotPocket.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly TMDBService _tmdbService;

        public MoviesController(TMDBService tmdbService)
        {
            _tmdbService = tmdbService;
        }

        [HttpGet("now-playing")]
        public async Task<IActionResult> GetNowPlaying()
        {
            var result = await _tmdbService.GetNowPlayingMoviesAsync();
            return Ok(result);
        }

        [HttpGet("top-rated")]
        public async Task<IActionResult> GetTopRated()
        {
            var result = await _tmdbService.GetTopRatedMoviesAsync();
            return Ok(result);
        }

        [HttpGet("popular")]
        public async Task<IActionResult> GetPopular()
        {
            var result = await _tmdbService.GetPopularMoviesAsync();
            return Ok(result);
        }
    }
}
