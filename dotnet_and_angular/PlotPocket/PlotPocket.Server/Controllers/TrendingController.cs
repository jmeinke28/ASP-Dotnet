using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PlotPocket.Server.Models.Dtos;
using PlotPocket.Server.Models.Entities;
using PlotPocket.Server.Services;

namespace PlotPocket.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrendingController : ControllerBase
    {
        private readonly TMDBService _tmdbService;
        private readonly ShowService _showService;
        private readonly UserManager<ApplicationUser> _userManager;

        public TrendingController(TMDBService tmdbService, ShowService showService, UserManager<ApplicationUser> userManager)
        {
            _tmdbService = tmdbService;
            _showService = showService;
            _userManager = userManager;
        }

        [HttpGet("all")]
        public async Task<ActionResult<List<ShowDto>>> GetTrendingAll([FromQuery] string timeWindow = "day")
        {
            var user = _userManager.GetUserId(User);
            var trending = await _tmdbService.GetTrendingShowsAsync(timeWindow);
            var showList = trending.Results.Select(x=> _showService.MediaItemToShowDto(x, user)).ToList();
            return Ok(showList);
        }

        [HttpGet("movies")]
        public async Task<ActionResult<List<ShowDto>>> GetTrendingMovies([FromQuery] string timeWindow = "day")
        {
            var user = _userManager.GetUserId(User);
            var movies = await _tmdbService.GetTrendingMoviesAsync(timeWindow);
            var showList = movies.Results.Select(x => _showService.MediaItemToShowDto(x, user)).ToList();
            return Ok(showList);
        }

        [HttpGet("tv")]
        public async Task<ActionResult<List<ShowDto>>> GetTrendingTv([FromQuery] string timeWindow = "day")
        {
            var user = _userManager.GetUserId(User);
            var tv = await _tmdbService.GetTrendingTvShowsAsync(timeWindow);
            var showList = tv.Results.Select(x => _showService.MediaItemToShowDto(x, user)).ToList();
            return Ok(showList);
        }
    }
}
