using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PlotPocket.Server.Models.Entities;

namespace PlotPocket.Server.Data;

public class ApplicationDbContext : IdentityDbContext
{
    public DbSet<Show> Shows { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }
}
