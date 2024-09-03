using System;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ProductService.Endpoints.Products;

public class DeleteProduct : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapDelete("/v1/api/products/{Id}", Handler)
            .WithTags("Products")
            .WithSummary("Delete a product")
            .WithRequestValidation<Request>();
    }

    public record Request(string Id);

    public class RequestValidator : AbstractValidator<Request>
    {
        public RequestValidator()
        {
            RuleFor(x => x.Id).SetValidator(new GuidValidator());
        }
    }

    private async Task<Results<Ok<SuccessResponse<string>>, NotFound<ErrorResponse>>> Handler([AsParameters]Request request, ProductDbContext context, CancellationToken cancellationToken)
    {

        var product = await context.Products
            .FirstOrDefaultAsync(x => x.Id == Guid.Parse(request.Id), cancellationToken);

        if (product is null)
        {
            return TypedResults.NotFound(new ErrorResponse(
                details: "Deleting product failed",
                errors: "Could not find product, Please try again later",
                traceId: Activity.Current?.Id ?? ""
            )); 
        }

        product.DeletedAt = DateTime.UtcNow;

        await context.SaveChangesAsync(cancellationToken);

        return TypedResults.Ok(new SuccessResponse<string>("Product deleted successfully"));
    }
}
