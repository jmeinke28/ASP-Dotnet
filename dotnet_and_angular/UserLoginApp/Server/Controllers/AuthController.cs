using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Server.Models;

namespace Server.Controllers {
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;

        public AuthController(
            SignInManager<IdentityUser> signInManager,
            UserManager<IdentityUser> userManager
        ) {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromBody] EmailLoginDetails details) {
            // Create IdentityUser instance
            IdentityUser user = new IdentityUser { UserName = details.Email, Email = details.Email };

            // Create the user
            IdentityResult result = await _userManager
                .CreateAsync(user, details.Password)
                .ConfigureAwait(false);

            if (!result.Succeeded) {
                List<string> errors = result.Errors
                    .Select(e => e.Description)
                    .ToList();

                return BadRequest(new { errors });
            }

            return Ok(new UserDto { Id = user.Id, UserName = user.UserName });
        }

        [AllowAnonymous]
        [HttpGet("test")]
        public async Task<ActionResult> Test() {
            /**
                Simple endpoint that can be used to see if your 
                authenitcation system is working.
            */
            return Ok(new { message = "hello" });
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login([FromBody] EmailLoginDetails details) {
            // Retrieve user
            IdentityUser? user = await _userManager
                .FindByEmailAsync(details.Email);

            if (null == user) {
                return BadRequest($"No user with username {details.Email}");
            }

            // Check if the password is correct & attempt to sign in
            var result = await _signInManager
                .PasswordSignInAsync(details.Email, details.Password, false, false)
                .ConfigureAwait(false);

            if (!result.Succeeded) {
                return Unauthorized();
            }

            return Ok(new UserDto { Id = user.Id, UserName = user.UserName });

        }

        [HttpPost("logout")]
        public async Task<ActionResult> Logout() {
            await _signInManager.SignOutAsync();

            return Ok(new { message = "Logged out successfully." });
        }

    }
}
