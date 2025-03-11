using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TrefleApp.Server.Services;
using TrefleApp.Server.Models.Trefle.Responses;
using TrefleApp.Server.Models.Trefle.Dtos;

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
        public async Task<ActionResult<PlantDto>> GetPlantById(int plantId) {
            PlantDto? plant = await _trefleService.GetPlantById(plantId);

            if(null == plant) {
                return NotFound($"Plant with ID {plantId} not found.");
            }

            return Ok(plant);
        }

        [HttpGet("plants")]
        public async Task<ActionResult<ICollection<PlantDto>>> GetPlants() {
            ICollection<PlantDto>? plants = await _trefleService.GetPlants();

            if(null == plants) {
                return BadRequest("Expected list of plants but got null instead.");
            }

            return Ok(plants);
        }

    }
}