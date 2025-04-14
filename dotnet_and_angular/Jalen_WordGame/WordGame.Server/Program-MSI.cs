using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
<<<<<<<< HEAD:dotnet_and_angular/Jalen_WordGame/WordGame.Server/Program-MSI.cs
using WordGame.Models;
using WordGame.Server.Data;
========
using PlotPocket.Server.Data;
using PlotPocket.Server.Services;

>>>>>>>> f6772b669156dbd79d36cc6622c6623a3ca220b6:dotnet_and_angular/PlotPocket/PlotPocket.Server/Program.cs

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(connectionString));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddControllersWithViews();

builder.Services.ConfigureApplicationCookie(options => {
    options.Events.OnRedirectToLogin = context => {
        if (context.Request.Path.StartsWithSegments("/api")) {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        }
        context.Response.Redirect(context.RedirectUri);
        return Task.CompletedTask;
    };
});

<<<<<<<< HEAD:dotnet_and_angular/Jalen_WordGame/WordGame.Server/Program-MSI.cs
========
builder.Services.AddScoped<ShowService>();

builder.Services.AddSingleton<TMDBService>();

>>>>>>>> f6772b669156dbd79d36cc6622c6623a3ca220b6:dotnet_and_angular/PlotPocket/PlotPocket.Server/Program.cs
builder.Services.AddSession(options => {
    options.IdleTimeout = TimeSpan.FromMinutes(30);

    options.Cookie.HttpOnly = true;

    options.Cookie.IsEssential = true;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin()  
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});


builder.Services.ConfigureApplicationCookie(options => {
    options.Events.OnRedirectToLogin = context => {
        if (context.Request.Path.StartsWithSegments("/api")) {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        }
        context.Response.Redirect(context.RedirectUri);
        return Task.CompletedTask;
    };
});

var app = builder.Build();

<<<<<<<< HEAD:dotnet_and_angular/Jalen_WordGame/WordGame.Server/Program-MSI.cs
========
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

>>>>>>>> f6772b669156dbd79d36cc6622c6623a3ca220b6:dotnet_and_angular/PlotPocket/PlotPocket.Server/Program.cs
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

<<<<<<<< HEAD:dotnet_and_angular/Jalen_WordGame/WordGame.Server/Program-MSI.cs
app.UseAuthentication();
========
app.UseCors("AllowAllOrigins"); 
app.UseSession();

>>>>>>>> f6772b669156dbd79d36cc6622c6623a3ca220b6:dotnet_and_angular/PlotPocket/PlotPocket.Server/Program.cs
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
<<<<<<<< HEAD:dotnet_and_angular/Jalen_WordGame/WordGame.Server/Program-MSI.cs
app.MapRazorPages();

app.Run();
========

app.MapFallbackToFile("index.html");

app.Run();
>>>>>>>> f6772b669156dbd79d36cc6622c6623a3ca220b6:dotnet_and_angular/PlotPocket/PlotPocket.Server/Program.cs
