using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PlotPocket.Server.Models.Dtos;
using PlotPocket.Server.Models.Entities;
using PlotPocket.Server.Services;

namespace PlotPocket.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly TMDBService _tmdbService;
        private readonly ShowService _showService;
        private readonly UserManager<ApplicationUser> _userManager;

        public MoviesController(TMDBService tmdbService, ShowService showService, UserManager<ApplicationUser> userManager)
        {
            _tmdbService = tmdbService;
            _showService = showService;
            _userManager = userManager;
        }

        [HttpGet("now-playing")]
        public async Task<ActionResult<List<ShowDto>>> GetNowPlaying()
        {
            var user = _userManager.GetUserId(User);
            var result = await _tmdbService.GetNowPlayingMoviesAsync();
            var movies = result.Results.Select(x => _showService.MediaItemToShowDto(x, user)).ToList();
            return Ok(result);
        }

        [HttpGet("top-rated")]
        public async Task<ActionResult<List<ShowDto>>> GetTopRated()
        {
            var user = _userManager.GetUserId(User);
            var result = await _tmdbService.GetTopRatedMoviesAsync();
            var movies = result.Results.Select(x => _showService.MediaItemToShowDto(x, user)).ToList();
            return Ok(result);
        }

        [HttpGet("popular")]
        public async Task<ActionResult<List<ShowDto>>> GetPopular()
        {
            var user = _userManager.GetUserId(User);
            var result = await _tmdbService.GetPopularMoviesAsync();
            var movies = result.Results.Select(x => _showService.MediaItemToShowDto(x, user)).ToList();
            return Ok(result);
        }
    }
}
