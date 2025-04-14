using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PlotPocket.Server.Data;
using PlotPocket.Server.Models.Entities;
using PlotPocket.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Get the connection string from appsettings.json or environment variables
var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

// Register DbContext with SQLite (or another database provider)
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite(connectionString));

// Register Identity services (UserManager, SignInManager, etc.)
builder
    .Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Add Database Developer Page Exception Filter (only for development)
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

// Add controllers and views (for MVC/Web API)
builder.Services.AddControllersWithViews();

// Add AutoMapper (for object mapping)
builder.Services.AddAutoMapper(typeof(Program));

// Register custom services
builder.Services.AddScoped<ShowService>();
builder.Services.AddSingleton<TMDBService>();

// Set up session management
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Adjust idle timeout as needed
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

// Configure CORS to allow all origins, methods, and headers
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowAllOrigins",
        policy =>
        {
            policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        }
    );
});

// Configure authentication cookie and redirect paths
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Events.OnRedirectToLogin = context =>
    {
        if (context.Request.Path.StartsWithSegments("/api"))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        }
        context.Response.Redirect(context.RedirectUri);
        return Task.CompletedTask;
    };
});

// Build the app
var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint(); // Automatically handle migrations in development
}
else
{
    app.UseExceptionHandler("/Home/Error"); // Generic error handler for production
    app.UseHsts(); // HTTP Strict Transport Security for production
}

app.UseHttpsRedirection(); // Redirect HTTP requests to HTTPS
app.UseStaticFiles(); // Serve static files like CSS, JS, etc.
app.UseRouting(); // Enable routing for controllers and API endpoints
app.UseCors("AllowAllOrigins"); // Apply the CORS policy
app.UseSession(); // Enable session middleware
app.UseAuthentication(); // Enable authentication middleware
app.UseAuthorization(); // Enable authorization middleware

// Define the default route for controllers
app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");

// Fallback to index.html for client-side routing (useful for SPA)
app.MapFallbackToFile("index.html");

// Run the app
app.Run();
