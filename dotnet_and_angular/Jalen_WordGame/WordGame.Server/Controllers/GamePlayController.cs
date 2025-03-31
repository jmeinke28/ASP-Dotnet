using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WordGame.Models;
using System.IO;

namespace WordGame.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GamePlayController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public GamePlayController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // Get All Games - `GET /api/gameplay/games`
        [HttpGet("games")]
        public async Task<IActionResult> GetAllGames()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized(new { message = "User not found." });
            }

            var games = await _context.Games
                .Where(g => g.UserId == user.Id)
                .Select(g => new GameDto
                {
                    Id = g.Id,
                    UserId = g.UserId,
                    Status = g.Status,
                    View = g.View,
                    RemainingGuesses = g.RemainingGuesses,
                    Answer = g.Status != "Unfinished" ? g.Target : null
                })
                .ToListAsync();

            return Ok(games);
        }

        // Get Single Game - `GET /api/gameplay/games/{gameId}`
        [HttpGet("games/{gameId}")]
        public async Task<IActionResult> GetGameById(int gameId)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized(new { message = "User not found." });
            }

            var game = await _context.Games.FirstOrDefaultAsync(g => g.Id == gameId && g.UserId == user.Id);
            if (game == null)
            {
                return NotFound(new { message = "Game not found." });
            }

            var gameDto = new GameDto
            {
                Id = game.Id,
                UserId = game.UserId,
                Status = game.Status,
                View = game.View,
                RemainingGuesses = game.RemainingGuesses,
                Answer = game.Status != "Unfinished" ? game.Target : null
            };

            return Ok(gameDto);
        }

        // Create New Game - `POST /api/gameplay/games/`
        [HttpPost("games")]
        public async Task<IActionResult> CreateNewGame()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized(new { message = "User not found." });
            }

            // Load words from wordList.json (Assuming it's in wwwroot/assets)
            var wordListPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assets", "wordList.json");
            if (!System.IO.File.Exists(wordListPath))
            {
                return StatusCode(500, new { message = "Word list not found." });
            }

            var wordListJson = await System.IO.File.ReadAllTextAsync(wordListPath);
            var wordList = System.Text.Json.JsonSerializer.Deserialize<List<string>>(wordListJson);

            if (wordList == null || wordList.Count == 0)
            {
                return StatusCode(500, new { message = "No words available for selection." });
            }

            var random = new Random();
            var targetWord = wordList[random.Next(wordList.Count)];

            var newGame = new Game
            {
                UserId = user.Id,
                Status = "Unfinished",
                Target = targetWord,
                Guesses = "",
                View = new string('_', targetWord.Length),
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
                RemainingGuesses = newGame.RemainingGuesses,
                Answer = null // Hide the answer since the game is ongoing
            };

            return CreatedAtAction(nameof(GetGameById), new { gameId = newGame.Id }, gameDto);
        }

        // Make a Guess - `POST /api/gameplay/games/{gameId}/guesses`
        [HttpPost("games/{gameId}/guesses")]
        public async Task<IActionResult> MakeGuess(int gameId, [FromQuery] string guess)
        {
            if (string.IsNullOrEmpty(guess) || guess.Length != 1)
            {
                return BadRequest(new { message = "Guess must be a single character." });
            }

            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized(new { message = "User not found." });
            }

            var game = await _context.Games.FirstOrDefaultAsync(g => g.Id == gameId && g.UserId == user.Id);
            if (game == null)
            {
                return NotFound(new { message = "Game not found." });
            }

            if (game.Status != "Unfinished")
            {
                return BadRequest(new { message = "Game is already finished." });
            }

            char guessedChar = char.ToLower(guess[0]);

            if (game.Guesses.Contains(guessedChar))
            {
                return BadRequest(new { message = "This letter has already been guessed." });
            }

            game.Guesses += guessedChar;
            bool correctGuess = false;
            char[] updatedView = game.View.ToCharArray();

            for (int i = 0; i < game.Target.Length; i++)
            {
                if (game.Target[i] == guessedChar)
                {
                    updatedView[i] = guessedChar;
                    correctGuess = true;
                }
            }

            game.View = new string(updatedView);

            if (!correctGuess)
            {
                game.RemainingGuesses--;
            }

            if (!game.View.Contains('_'))
            {
                game.Status = "Win";
            }
            else if (game.RemainingGuesses <= 0)
            {
                game.Status = "Loss";
            }

            await _context.SaveChangesAsync();

            var gameDto = new GameDto
            {
                Id = game.Id,
                UserId = game.UserId,
                Status = game.Status,
                View = game.View,
                RemainingGuesses = game.RemainingGuesses,
                Answer = game.Status != "Unfinished" ? game.Target : null
            };

            return Ok(gameDto);
        }

        // Delete Game - `DELETE /api/gameplay/games/{gameId}`
        [HttpDelete("games/{gameId}")]
        public async Task<IActionResult> DeleteGame(int gameId)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized(new { message = "User not found." });
            }

            var game = await _context.Games.FirstOrDefaultAsync(g => g.Id == gameId && g.UserId == user.Id);
            if (game == null)
            {
                return NotFound(new { message = "Game not found." });
            }

            _context.Games.Remove(game);
            await _context.SaveChangesAsync();

            var remainingGames = await _context.Games
                .Where(g => g.UserId == user.Id)
                .Select(g => new GameDto
                {
                    Id = g.Id,
                    UserId = g.UserId,
                    Status = g.Status,
                    View = g.View,
                    RemainingGuesses = g.RemainingGuesses,
                    Answer = g.Status != "Unfinished" ? g.Target : null
                })
                .ToListAsync();

            return Ok(remainingGames);
        }
    }
}