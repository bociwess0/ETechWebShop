using API.Data;
using API.Data.Migrations;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<StoreContext>(opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();
builder.Services.AddScoped<TokenService>();

builder.Services.AddCors();
builder.Services.AddIdentityCore<User>(opt => {
    opt.User.RequireUniqueEmail = true; // uniqe emails only
})
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<StoreContext>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(opt => {
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

var scope  = app.Services.CreateScope();
var context  = scope.ServiceProvider.GetRequiredService<StoreContext>();
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
var logger  = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

try
{
    await context.Database.MigrateAsync();
    await DbInitializer.Initialize(context, userManager);
}
catch (Exception ex)
{
    logger.LogError(ex, "A problem occured during migration!");
}

app.Run();
