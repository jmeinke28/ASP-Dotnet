using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PlotPocket.Server.Data;
using PlotPocket.Server.Models.Entities;
using PlotPocket.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// ----------------------
// Configure Services
// ----------------------

// 1. Get the connection string
var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

// 2. Register DbContext (using SQLite)
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite(connectionString));

// 3. Register Identity with ApplicationUser
builder
    .Services.AddIdentity<IdentityUser, IdentityRole>(options =>
    {
        options.SignIn.RequireConfirmedAccount = false;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// 4. Register session middleware
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromHours(1);
    options.Cookie.Name = ".plotpocket.Session";
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.Strict;
    options.Cookie.IsEssential = true;
});

// 5. Register CORS
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

// 6. Register MVC & Razor views
builder.Services.AddControllersWithViews();

// 7. Register AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

// 8. Register custom services
builder.Services.AddScoped<ShowService>();
builder.Services.AddSingleton<TMDBService>();

// 9. Configure cookie authentication
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

// 10. Developer exception filter (for EF errors)
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

// ----------------------
// Configure Middleware
// ----------------------

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint(); // Auto-run EF migrations
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCors("AllowAllOrigins");
app.UseSession();
app.UseAuthentication();
app.UseAuthorization();

// MVC route
app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");

// Fallback for Angular/React/etc.
app.MapFallbackToFile("index.html");

app.Run();
