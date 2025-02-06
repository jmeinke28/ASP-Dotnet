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

        //localhost:5000/api/products/8
        [HttpGet("{productId}")]
        public async Task<ActionResult<Product>> GetProductById(int productId) {
            Product? product = await _context.Products.FindAsync(productId);

            if(null == product) {
                return NotFound($"Product with ID {productId} was not found.");
            }

            return Ok(product);
        }

    }
}
