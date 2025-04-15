using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PlotPocket.Server.Models;
using PlotPocket.Server.Models.Entities;

namespace PlotPocket.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] EmailLoginDetails loginDetails)
        {
            if (
                loginDetails == null
                || string.IsNullOrEmpty(loginDetails.Email)
                || string.IsNullOrEmpty(loginDetails.Password)
            )
            {
                return BadRequest(new { Message = "Email and password are required." });
            }

            var user = new ApplicationUser
            {
                UserName = loginDetails.Email,
                Email = loginDetails.Email,
            };
            var result = await _userManager.CreateAsync(user, loginDetails.Password!);

            if (result.Succeeded)
            {
                return Ok(new { Message = "User registered successfully." });
            }

            return BadRequest(new { Message = "Registration failed.", Errors = result.Errors });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] EmailLoginDetails loginDetails)
        {
            if (
                loginDetails == null
                || string.IsNullOrEmpty(loginDetails.Email)
                || string.IsNullOrEmpty(loginDetails.Password)
            )
            {
                return BadRequest(new { Message = "Email and password are required." });
            }

            var result = await _signInManager.PasswordSignInAsync(
                loginDetails.Email,
                loginDetails.Password,
                false,
                false
            );

            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(loginDetails.Email);

                if (user != null)
                {
                    return Ok(
                        new
                        {
                            Message = "Login successful.",
                            User = new
                            {
                                user.Email,
                                user.UserName,
                                user.Id,
                            },
                        }
                    );
                }

                return Ok(
                    new { Message = "Login successful, but user details could not be retrieved." }
                );
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
