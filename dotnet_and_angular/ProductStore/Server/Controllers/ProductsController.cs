using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Controllers
{
    //localhost:5000/api/products
    [Route("api/[controller]")]    
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context) {
            _context = context;
        }

        //localhost:5000/api/products/
        [HttpGet("")]
        public async Task<ActionResult> GetAllProducts() {

            return Ok(await _context.Products.ToListAsync());
        }

    }
}
