using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PlotPocket.Server.Models.Dtos;
using PlotPocket.Server.Models.Entities;
using PlotPocket.Server.Services;

namespace PlotPocket.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TvShowsController : ControllerBase
    {
        private readonly TMDBService _tmdbService;
        private readonly ShowService _showService;
        private readonly UserManager<ApplicationUser> _userManager;

        public TvShowsController(
            TMDBService tmdbService,
            ShowService showService,
            UserManager<ApplicationUser> userManager
        )
        {
            _showService = showService;
            _userManager = userManager;
            _tmdbService = tmdbService;
        }

        [HttpGet("airing-today")]
        public async Task<ActionResult<List<ShowDto>>> GetAiringToday()
        {
            var user = _userManager.GetUserId(User);
            var shows = await _tmdbService.GetAiringTodayTvShowsAsync();
            var showList = shows
                .Results.Select(x => _showService.MediaItemToShowDto(x, user))
                .ToList();
            return Ok(showList); // Return transformed list instead of raw shows
        }

        [HttpGet("top-rated")]
        public async Task<ActionResult<List<ShowDto>>> GetTopRated()
        {
            var user = _userManager.GetUserId(User);
            var shows = await _tmdbService.GetTopRatedTvShowsAsync();
            var showList = shows
                .Results.Select(x => _showService.MediaItemToShowDto(x, user))
                .ToList();
            return Ok(showList); // Return transformed list instead of raw shows
        }

        [HttpGet("popular")]
        public async Task<ActionResult<List<ShowDto>>> GetPopular()
        {
            var user = _userManager.GetUserId(User);
            var shows = await _tmdbService.GetPopularTvShowsAsync();
            var showList = shows
                .Results.Select(x => _showService.MediaItemToShowDto(x, user))
                .ToList();
            return Ok(showList); // Return transformed list instead of raw shows
        }
    }
}
