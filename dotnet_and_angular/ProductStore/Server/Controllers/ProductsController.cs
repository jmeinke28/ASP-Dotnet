using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]

    //localhost:5000/api/products

    [ApiController]
    public class ProductsController : ControllerBase
    {

        //localhost:5000/api/products
        [HttpGet("")]
        public async Task<ActionResult> GetAllProducts() {
            return Ok("Response from GetAllProducts");
        }

    }
}
