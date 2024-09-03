
namespace SharedService.Filters;

public class EnsureBodyDataExistsFilter<TRequest> : IEndpointFilter
{
    public async ValueTask<object> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        var request = context.Arguments.FirstOrDefault(arg => arg is TRequest);

        if (request == null)
        {
            return Results.BadRequest(new ErrorResponse(
                details: "Missing body parameters",
                errors: $"Body parameter {typeof(TRequest).Name} is missing or invalid",
                traceId: Activity.Current?.Id ?? ""
            ));
        }

        return await next(context);
    }
}