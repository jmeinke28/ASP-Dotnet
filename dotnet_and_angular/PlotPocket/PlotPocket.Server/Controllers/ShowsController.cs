using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlotPocket.Server.Data;
using PlotPocket.Server.Models.Dtos;
using PlotPocket.Server.Models.Entities;
using PlotPocket.Server.Services;

namespace PlotPocket.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowsController : ControllerBase
    {
        private readonly TMDBService _tmdbService;
        private readonly ShowService _showService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public ShowsController(TMDBService tmdbService, ShowService showService, UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _tmdbService = tmdbService;
            _showService = showService;
            _userManager = userManager;
            _context = context;
        }

        [HttpPost("add")]
        public async Task<ActionResult<ShowDto>> AddShow([FromBody] ShowDto showDto)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return NotFound();
            }

            var existingShow = await _context.Shows.FirstOrDefaultAsync(s => s.ShowApiId == showDto.ShowApiId);

            if (existingShow != null)
            {
                if (!user.Shows.Contains(existingShow))
                {
                    user.Shows.Add(existingShow);
                    await _context.SaveChangesAsync();
                }
                return Ok(_showService.ShowToShowDto(existingShow));
            }
            else
            {
                var newShow = new Show
                {
                    ShowApiId = showDto.ShowApiId,
                    Title = showDto.Title,
                    Date = showDto.Date,
                    PosterPath = showDto.PosterPath
                };

                _context.Shows.Add(newShow);
                await _context.SaveChangesAsync();

                user.Shows.Add(newShow);
                await _context.SaveChangesAsync();

                return Ok(_showService.ShowToShowDto(newShow));
            }
        }

        [HttpDelete("{showId}")]
        public async Task<IActionResult> RemoveShow(int showId)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return NotFound();
            }

            var show = await _context.Shows
                .Include(s => s.Users)
                .FirstOrDefaultAsync(s => s.Id == showId);

            if (show == null || !user.Shows.Contains(show))
            {
                return NotFound();
            }

            user.Shows.Remove(show);
            await _context.SaveChangesAsync();

            if (!show.Users.Any())
            {
                _context.Shows.Remove(show);
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBookmarks()
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return NotFound();
            }

            var bookmarkedShows = user.Shows;

            var showDtos = bookmarkedShows
                .Select(show => _showService.ShowToShowDto(show))
                .ToList();

            return Ok(showDtos);
        }
    }
}
