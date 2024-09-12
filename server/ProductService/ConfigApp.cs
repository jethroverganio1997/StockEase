using System;

namespace ProductService;

public static class ConfigureApp
{
    public static void ConfigApp(this WebApplication app)
    {
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseExceptionHandler(options => { });
        app.UseSerilogRequestLogging();
        app.MapEndpoints();
        app.ConfigDevEnv();
        DbInitializer.InitializeDb(app);
    }

    public static void ConfigDevEnv(this WebApplication app)
    {
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
    }
}
