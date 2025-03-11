using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TrefleApp.Server.Services;
using TrefleApp.Server.Models.Trefle.Responses;

namespace TrefleApp.Server.Controllers {
    // localhost/api/trefle
    [Route("api/[controller]")]
    [ApiController]
    public class TrefleController : ControllerBase {
        private readonly TrefleService _trefleService;

        public TrefleController(TrefleService trefleService) {
            _trefleService = trefleService;
        }

        [HttpGet("plants/{plantId}")]
        public async Task<ActionResult<Plant>> GetPlantById(int plantId) {
            Plant? plant = await _trefleService.GetPlantById(plantId);

            if(null == plant) {
                return NotFound($"Plant with ID {plantId} not found.");
            }

            return Ok(plant);
        }

        [HttpGet("plants")]
        public async Task<ActionResult<ICollection<Plant>>> GetPlants() {
            ICollection<Plant>? plants = await _trefleService.GetPlants();

            if(null == plants) {
                return BadRequest("Expected list of plants but got null instead.");
            }

            return Ok(plants);
        }

    }
}