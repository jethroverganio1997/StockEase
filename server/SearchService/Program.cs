

var builder = WebApplication.CreateBuilder(args);
var assembly = typeof(Program).Assembly;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

try
{
    builder.Host.UseSerilog((ctx, lc) => lc
        .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}")
        .Enrich.FromLogContext()
        .ReadFrom.Configuration(ctx.Configuration));

    builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
    builder.Services.AddEndpoints(assembly);
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddAutoMapper(assembly);
    builder.Services.AddMassTransit(x =>
    {
        x.AddConsumersFromNamespaceContaining<ProductCreatedConsumer>();
        x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("search", false));
        x.UsingRabbitMq((context, cfg) =>
        {
            //TODO* handle error when search service database is down
            // it will retry to send the message from rabbitmq to search service db
            // for 5 times with 5 seconds interval before moving the message to the error queue
            cfg.ReceiveEndpoint("search-product-created", e =>
            {
                e.UseMessageRetry(r => r.Interval(5, 5));
                e.ConfigureConsumer<ProductCreatedConsumer>(context);
            });

            cfg.ConfigureEndpoints(context);
        });
    });
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
    app.UseSerilogRequestLogging();
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
    Log.Fatal(ex, "Application terminated unexpectedly");
    throw;
}
finally
{
    Log.CloseAndFlush();
}
