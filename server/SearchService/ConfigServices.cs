using System;

namespace SearchService;

public static class ConfigServices
{
    public static void AddServices(this WebApplicationBuilder builder)
    {
        var assembly = typeof(Program).Assembly;

        builder.AddSerilog();
        builder.AddSwagger();
        builder.AddMassTransit();  // message broker using RabbitMQ

        builder.Services.AddAutoMapper(assembly);
        builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
        builder.Services.AddEndpoints(assembly);
    }

    public static void AddSerilog(this WebApplicationBuilder builder)
    {
        builder.Host.UseSerilog((ctx, lc) => lc
            .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}")
            .Enrich.FromLogContext()
            .ReadFrom.Configuration(ctx.Configuration));
    }

    public static void AddSwagger(this WebApplicationBuilder builder)
    {
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
    }

    public static void AddMassTransit(this WebApplicationBuilder builder)
    {
        builder.Services.AddMassTransit(x =>
        {
            x.AddConsumersFromNamespaceContaining<ProductCreatedConsumer>();
            x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("search", false));
            x.UsingRabbitMq((context, cfg) =>
            {
                cfg.ReceiveEndpoint("search-product-created", e =>
                {
                    e.UseMessageRetry(r => r.Interval(5, 5));
                    e.ConfigureConsumer<ProductCreatedConsumer>(context);
                });

                cfg.ConfigureEndpoints(context);
            });
        });
    }

}
