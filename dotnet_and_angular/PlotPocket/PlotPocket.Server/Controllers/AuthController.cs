using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PlotPocket.Server.Models;
using System.Threading.Tasks;

namespace PlotPocket.Server.Controllers
{
    [Route("auth")]
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

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var user = await _userManager.FindByEmailAsync(loginRequest?.Email);
            if (user == null)
            {
                return Unauthorized("Invalid credentials");
            }

            var result = await _signInManager.PasswordSignInAsync(user, loginRequest.Password, false, false);
            if (result.Succeeded)
            {
                return Ok(new
                {
                    Id = user.Id,
                    Username = user.UserName,
                    Email = user.Email
                });
            }
            return Unauthorized("Invalid credentials");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
        {
            if (registerRequest.Password != registerRequest.ConfirmPassword)
            {
                return BadRequest("Passwords do not match");
            }

            var user = new IdentityUser
            {
                UserName = registerRequest.Email, 
                Email = registerRequest.Email
            };

            var result = await _userManager.CreateAsync(user, registerRequest.Password);
            if (result.Succeeded)
            {
                return Ok(new
                {
                    Id = user.Id,
                    Username = user.UserName,
                    Email = user.Email
                });
            }

            return BadRequest(result.Errors);
        }
    }
}
