using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using WordGame.Models;
using WordGame.Server.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace WordGame.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]  // Ensures only authenticated users can access the endpoints
    public class GamePlayController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public GamePlayController(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        // Get All Games for the authenticated user
        [HttpGet("games")]
        public async Task<IActionResult> GetAllGames()
        {
            var userId = _userManager.GetUserId(User);
            var games = await _context.Games
                .Where(g => g.UserId == userId)
                .ToListAsync();

            var gameDtos = games.Select(g => new GameDto
            {
                Id = g.Id,
                UserId = g.UserId,
                Status = g.Status,
                View = g.View,
                RemainingGuesses = g.RemainingGuesses
            }).ToList();

            return Ok(gameDtos);
        }

        // Get a single game by ID
        [HttpGet("games/{gameId}")]
        public async Task<IActionResult> GetGame(int gameId)
        {
            var userId = _userManager.GetUserId(User);
            var game = await _context.Games
                .Where(g => g.Id == gameId && g.UserId == userId)
                .FirstOrDefaultAsync();

            if (game == null)
            {
                return NotFound(new { Message = "Game not found or does not belong to the user." });
            }

            var gameDto = new GameDto
            {
                Id = game.Id,
                UserId = game.UserId,
                Status = game.Status,
                View = game.View,
                RemainingGuesses = game.RemainingGuesses
            };

            return Ok(gameDto);
        }

        // Create a new game for the authenticated user
        [HttpPost("games")]
        public async Task<IActionResult> CreateGame()
        {
            var userId = _userManager.GetUserId(User);

            // Sample random word selection for game target (you can modify to get from a database or a file)
            string[] words = new string[] { "apple", "banana", "cherry", "grape", "orange" };
            var random = new Random();
            string target = words[random.Next(words.Length)];

            var newGame = new Game
            {
                UserId = userId,
                Status = "Unfinished",
                Target = target,
                Guesses = string.Empty,
                View = new string('_', target.Length),
                RemainingGuesses = 8
            };

            _context.Games.Add(newGame);
            await _context.SaveChangesAsync();

            var gameDto = new GameDto
            {
                Id = newGame.Id,
                UserId = newGame.UserId,
                Status = newGame.Status,
                View = newGame.View,
                RemainingGuesses = newGame.RemainingGuesses
            };

            return Ok(gameDto);
        }

        // Make a guess for a specific game
        [HttpPost("games/{gameId}/guesses")]
        public async Task<IActionResult> MakeGuess(int gameId, [FromQuery] string guess)
        {
            if (string.IsNullOrEmpty(guess) || guess.Length != 1)
            {
                return BadRequest(new { Message = "Guess must be a single character." });
            }

            var userId = _userManager.GetUserId(User);
            var game = await _context.Games
                .Where(g => g.Id == gameId && g.UserId == userId)
                .FirstOrDefaultAsync();

            if (game == null)
            {
                return NotFound(new { Message = "Game not found or does not belong to the user." });
            }

            // Check if guess is correct and update the game view
            if (game.Target.Contains(guess))
            {
                var newView = game.View.ToCharArray();
                for (int i = 0; i < game.Target.Length; i++)
                {
                    if (game.Target[i] == guess[0])
                    {
                        newView[i] = guess[0];
                    }
                }

                game.View = new string(newView);
            }
            else
            {
                game.RemainingGuesses--;
            }

            // Check if the game is finished
            if (game.RemainingGuesses == 0)
            {
                game.Status = "Loss";
            }
            else if (!game.View.Contains('_'))
            {
                game.Status = "Win";
            }

            await _context.SaveChangesAsync();

            var gameDto = new GameDto
            {
                Id = game.Id,
                UserId = game.UserId,
                Status = game.Status,
                View = game.View,
                RemainingGuesses = game.RemainingGuesses
            };

            return Ok(gameDto);
        }

        // Delete a game for the authenticated user
        [HttpDelete("games/{gameId}")]
        public async Task<IActionResult> DeleteGame(int gameId)
        {
            var userId = _userManager.GetUserId(User);
            var game = await _context.Games
                .Where(g => g.Id == gameId && g.UserId == userId)
                .FirstOrDefaultAsync();

            if (game == null)
            {
                return NotFound(new { Message = "Game not found or does not belong to the user." });
            }

            _context.Games.Remove(game);
            await _context.SaveChangesAsync();

            var remainingGames = await _context.Games
                .Where(g => g.UserId == userId)
                .ToListAsync();

            var gameDtos = remainingGames.Select(g => new GameDto
            {
                Id = g.Id,
                UserId = g.UserId,
                Status = g.Status,
                View = g.View,
                RemainingGuesses = g.RemainingGuesses
            }).ToList();

            return Ok(gameDtos);
        }
    }
}
