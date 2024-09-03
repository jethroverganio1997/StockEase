

using Microsoft.OpenApi.Models;
using SwaggerThemes;

var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console(formatProvider: CultureInfo.CurrentCulture)
    .CreateBootstrapLogger();

try
{
    Log.Information("Starting web application");
    var assembly = typeof(Program).Assembly;
    
    builder.Host.UseSerilog();
    builder.Services.AddSerilog(); 
    builder.Services.AddSingleton(Log.Logger);
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerDocument(config =>
    {
        config.PostProcess = document =>
        {
            document.Info = new NSwag.OpenApiInfo
            {
                Version = "v1",
                Title = "Product Service",
                Description = "An ASP.NET Core Web API for managing product service endpoints",
            };
        };
    });

    builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
    builder.Services.AddEndpoints(assembly);
    builder.Services.AddValidatorsFromAssembly(assembly);
    builder.Services.AddAutoMapper(assembly);
    builder.Services.AddDbContext<ProductDbContext>(opt => 
    {
        opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
    });

    var app = builder.Build();
    if (app.Environment.IsDevelopment())
    {
        app.UseOpenApi();
        app.UseSwaggerUi(options =>
        {
            options.CustomInlineStyles = SwaggerTheme.GetSwaggerThemeCss(Theme.Dracula);
        });
        app.UseReDoc(options =>
        {
            options.Path = "/redoc";
        });
    }
    app.UseExceptionHandler(options => { });
    app.UseSerilogRequestLogging();
    app.MapEndpoints();
    DbInitializer.InitDb(app);
    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
    throw;
}
finally
{
    Log.CloseAndFlush();
}

