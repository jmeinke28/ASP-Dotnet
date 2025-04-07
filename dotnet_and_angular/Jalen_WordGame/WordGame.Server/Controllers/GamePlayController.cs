using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using WordGame.Models;
using WordGame.Server.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;

namespace WordGame.Server.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GamePlayController : ControllerBase {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly WordList _wordList;

        public GamePlayController(UserManager<IdentityUser> userManager, ApplicationDbContext context) {
            _userManager = userManager;
            _context = context;
            var wordList = System.IO.File.ReadAllText("Assets/wordList.json");

            if (wordList == null) {
                throw new Exception("Word list not found.");
            }

            _wordList = JsonSerializer.Deserialize<WordList>(wordList)!;
        }

        [HttpGet("games")]
        public async Task<IActionResult> GetAllGames() {
            var userId = _userManager.GetUserId(User);
            var games = await _context.Games
                .Where(g => g.UserId == userId)
                .ToListAsync();

            var gameDtos = games.Select(g => g.GetGameDto()).ToList();
            return Ok(gameDtos);
        }

        [HttpGet("games/{gameId}")]
        public async Task<IActionResult> GetGame(int gameId) {
            var userId = _userManager.GetUserId(User);
            var game = await _context.Games
                .Where(g => g.Id == gameId && g.UserId == userId)
                .FirstOrDefaultAsync();

            if (game == null) {
                return NotFound(new { Message = "Game not found or does not belong to the user." });
            }

            var gameDto = game.GetGameDto();
            return Ok(gameDto);
        }

        [HttpPost("games")]
        public async Task<IActionResult> CreateGame() {
            var userId = _userManager.GetUserId(User);
            var target = _wordList.GetRandomWord();

            var newGame = new Game {
                UserId = userId,
                Status = "Unfinished",
                Target = target,
                View = new string('_', target.Length),
                RemainingGuesses = 8
            };

            _context.Games.Add(newGame);
            await _context.SaveChangesAsync();

            var gameDto = newGame.GetGameDto();
            return Ok(gameDto);
        }

        [HttpPost("games/{gameId}/guesses")]
        public async Task<IActionResult> MakeGuess(int gameId, [FromQuery] string guess) {
            if (string.IsNullOrEmpty(guess) || guess.Length != 1) {
                return BadRequest(new { Message = "Guess must be a single character." });
            }

            var userId = _userManager.GetUserId(User);
            var game = await _context.Games
                .Where(g => g.Id == gameId && g.UserId == userId)
                .FirstOrDefaultAsync();

            if (game == null) {
                return NotFound(new { Message = "Game not found or does not belong to the user." });
            }

            game.Guesses += guess;

            if (!string.IsNullOrEmpty(game.Target) && game.Target.Contains(guess)) {
                var currentView = game.View ?? new string('_', game.Target.Length);
                var newView = currentView.ToCharArray();

                for (int i = 0; i < game.Target.Length; i++) {
                    if (game.Target[i] == guess[0]) {
                        newView[i] = guess[0];
                    }
                }

                game.View = new string(newView);
            } else {
                game.RemainingGuesses--;
            }

            if (game.RemainingGuesses == 0) {
                game.Status = "Loss";
            } else if (!string.IsNullOrEmpty(game.View) && !game.View.Contains('_')) {
                game.Status = "Win";
            }

            await _context.SaveChangesAsync();

            var gameDto = game.GetGameDto();
            return Ok(gameDto);
        }

        [HttpDelete("games/{gameId}")]
        public async Task<IActionResult> DeleteGame(int gameId) {
            var userId = _userManager.GetUserId(User);
            var game = await _context.Games
                .Where(g => g.Id == gameId && g.UserId == userId)
                .FirstOrDefaultAsync();

            if (game == null) {
                return NotFound(new { Message = "Game not found or does not belong to the user." });
            }

            _context.Games.Remove(game);
            await _context.SaveChangesAsync();

            var remainingGames = await _context.Games
                .Where(g => g.UserId == userId)
                .ToListAsync();

            var gameDtos = remainingGames.Select(g => g.GetGameDto()).ToList();
            return Ok(gameDtos);
        }
    }
}