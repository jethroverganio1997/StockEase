
var builder = WebApplication.CreateBuilder(args);
var assembly = typeof(Program).Assembly;

try
{
    builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
    builder.Services.AddEndpoints(assembly);
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerDocument(config =>
    {
        config.PostProcess = document =>
        {
            document.Info = new NSwag.OpenApiInfo
            {
                Version = "v1",
                Title = "Search Service",
                Description = "An ASP.NET Core Web API for managing search service endpoints",
            };
        };
    });

    var app = builder.Build();
    await DbInitializer.InitDb(app);

    app.UseExceptionHandler(options => { });
    app.MapEndpoints();

    if (app.Environment.IsDevelopment())
    {
        app.UseOpenApi();
        app.UseSwaggerUi();
        app.UseReDoc(options =>
        {
            options.Path = "/redoc";
        });
    }

    app.Run();
}
catch (Exception ex)
{
    LoggerMessage.Define(LogLevel.Critical, new EventId(0), $"An error occurred while starting the application exception:{ex}");
    throw;
}
