
using System.Diagnostics;
using Microsoft.AspNetCore.Diagnostics;
using SharedService.Responses;

namespace SharedService.Exceptions;

public class GlobalExceptionHandler : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger;

    public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
    {
        _logger = logger;
    }
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        var traceId = Activity.Current?.Id ?? httpContext.TraceIdentifier;
        var message = exception.Message;

        _logger.LogError(
            exception,
            "Exception occurred: {message}. TraceId:{traceId}",
            message,
            traceId
        );


        await Results.Json(new ErrorResponse
        (
            details:exception.Message,
            errors: new { ExceptionMessage = "An error occurred while processing your request." },
            traceId: traceId
        ),
            statusCode: StatusCodes.Status500InternalServerError,
            contentType: "application/json"
        ).ExecuteAsync(httpContext);

        return true;
    }
}

