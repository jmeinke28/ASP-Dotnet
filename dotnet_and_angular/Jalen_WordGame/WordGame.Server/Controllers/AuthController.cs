using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using WordGame.Models;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;

namespace WordGame.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;

        public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        // Register Endpoint: Registers a new user
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] EmailLoginDetails loginDetails)
        {
            var user = new ApplicationUser { UserName = loginDetails.Email, Email = loginDetails.Email };
            var result = await _userManager.CreateAsync(user, loginDetails.Password);

            if (result.Succeeded)
            {
                return Ok(new { Message = "User registered successfully." });
            }

            return BadRequest(result.Errors);
        }

        // Login Endpoint: Authenticates and logs in a user, returns a JWT token
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] EmailLoginDetails loginDetails)
        {
            var user = await _userManager.FindByEmailAsync(loginDetails.Email);

            if (user != null && await _userManager.CheckPasswordAsync(user, loginDetails.Password))
            {
                // Generate the JWT token
                var claims = new[]
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.NameIdentifier, user.Id)
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds
                );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }

            return Unauthorized(new { Message = "Invalid credentials." });
        }

        // Logout Endpoint: Logs out the current user
        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(new { Message = "Logged out successfully." });
        }
    }
}
