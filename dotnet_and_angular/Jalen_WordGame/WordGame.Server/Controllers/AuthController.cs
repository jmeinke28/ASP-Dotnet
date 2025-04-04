using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using WordGame.Models;
using System.Threading.Tasks;

namespace WordGame.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AuthController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] EmailLoginDetails loginDetails)
        {
            var user = new ApplicationUser { UserName = loginDetails.Email, Email = loginDetails.Email };
            var result = await _userManager.CreateAsync(user, loginDetails.Password);

            if (result.Succeeded)
            {
                return Ok(new { Message = "User registered successfully." });
            }

            return BadRequest(new { Message = "Registration failed.", Errors = result.Errors });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] EmailLoginDetails loginDetails)
        {
            var result = await _signInManager.PasswordSignInAsync(loginDetails.Email, loginDetails.Password, false, false);

            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(loginDetails.Email);
                return Ok(new { Message = "Login successful.", User = user });
            }

            return Unauthorized(new { Message = "Invalid credentials." });
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(new { Message = "Logged out successfully." });
        }
    }
}