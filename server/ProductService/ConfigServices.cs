using System;

namespace ProductService;

public static class ConfigServices
{
    public static void AddServices(this WebApplicationBuilder builder)
    {
        var assembly = typeof(Program).Assembly;

        builder.AddSerilog();
        builder.AddSwagger();
        builder.AddIdentityAuth(); //Identity Duendi for Authentication and Authorization
        builder.AddDatabase(); // Postgres Database
        builder.AddMassTransit(); // message broker using RabbitMQ

        builder.Services.AddEndpoints(assembly);
        builder.Services.AddAutoMapper(assembly);
        builder.Services.AddValidatorsFromAssembly(assembly);
        builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
    }

    public static void AddSerilog(this WebApplicationBuilder builder)
    {
        builder.Host.UseSerilog((ctx, lc) => lc
            .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}")
            .Enrich.FromLogContext()
            .ReadFrom.Configuration(ctx.Configuration));
        builder.Services.AddSingleton(Log.Logger);
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
                    Title = "Product Service",
                    Description = "An ASP.NET Core Web API for managing product service endpoints",
                };
            };
        });
    }

    public static void AddIdentityAuth(this WebApplicationBuilder builder)
    {
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.Authority = builder.Configuration["IdentityServiceUrl"];
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters.ValidateAudience = false;
                options.TokenValidationParameters.NameClaimType = "username";
            });
        builder.Services.AddAuthorization();
    }

    public static void AddDatabase(this WebApplicationBuilder builder)
    {
         builder.Services.AddDbContext<ProductDbContext>(opt => 
        {
            opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
        });
    }

    public static void AddMassTransit(this WebApplicationBuilder builder)
    {
        builder.Services.AddMassTransit(x =>
        {
            //TODO* handle error when rabbitmq is down,
            //trying to send data to the queue, the data will be stored in the outbox
            //and check the outbox for the data for the next 10 seconds and try to send it again
            //if the rabbitmq is up, the data will be sent to the queue
            x.AddEntityFrameworkOutbox<ProductDbContext>(o =>
            {
                o.QueryDelay = TimeSpan.FromHours(1);
                o.UsePostgres();
                o.UseBusOutbox();
            });
            x.UsingRabbitMq((context, cfg) =>
            {
                cfg.ConfigureEndpoints(context);
            });
            // Receive messages from the fault queue
            x.AddConsumersFromNamespaceContaining<ProductCreatedFaultConsumer>();
            x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("product", false));
        });
    }
}
