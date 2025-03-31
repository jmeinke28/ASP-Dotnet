using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WordGame.Models;

namespace WordGame.Server.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Game> Games { get; set; }
    public DbSet<GameDto> GameDtos { get; set; }
    public DbSet<UserDto> UserDtos { get; set; }

    // Make EmailLoginDetails keyless
    public DbSet<EmailLoginDetails> EmailLoginDetails { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Mark EmailLoginDetails as a keyless entity
        modelBuilder.Entity<EmailLoginDetails>().HasNoKey();
    }
}
