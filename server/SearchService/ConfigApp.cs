using System;

namespace SearchService;

public static class ConfigApp
{
    public static async Task ConfigureApp(this WebApplication app)
    {
        app.UseSerilogRequestLogging();
        app.MapEndpoints();
        app.ConfigDevEnv();
        app.UseExceptionHandler(options => { });
        await DbInitializer.InitDb(app);
    }

    public static void ConfigDevEnv(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseOpenApi();
            app.UseSwaggerUi();
            app.UseReDoc(options =>
            {
                options.Path = "/redoc";
            });
        }
    }
}
