using System;

namespace SharedService.Extensions;

public static class RouteHandlerBuilderValidationExtensions
{
     /// <summary>
    /// Adds a request validation filter to the route handler.
    /// </summary>
    /// <typeparam name="TRequest"></typeparam>
    /// <param name="builder"></param>
    /// <returns>A <see cref="RouteHandlerBuilder"/> that can be used to futher customize the endpoint.</returns>
    public static RouteHandlerBuilder WithRequestValidation<TRequest>(this RouteHandlerBuilder builder)
    {
        return builder
            .AddEndpointFilter<RequestLoggingFilter>()
            .AddEndpointFilter<RequestValidationFilter<TRequest>>();
    }
}
