

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("customPolicy",
        b =>
        {
            b.WithOrigins(builder.Configuration["ClientApp"])
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["IdentityServiceUrl"];
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters.ValidateAudience = false;
        options.TokenValidationParameters.NameClaimType = "username";
    });

var app = builder.Build();
app.UseCors("customPolicy");

app.MapReverseProxy();

app.UseAuthentication();
app.UseAuthorization();

app.UseExceptionHandler(options => { });


app.Run();
