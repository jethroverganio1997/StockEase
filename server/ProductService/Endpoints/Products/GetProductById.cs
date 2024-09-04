using System;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ProductService.Endpoints.Products;

public class GetProductById : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("v1/api/products/{Id}", Handler)
            .WithTags("Products")
            .WithSummary("Get a product by ID")
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

    private async Task<Results<Ok<SuccessResponse<ProductDto>>, NotFound<ErrorResponse>>> Handler([AsParameters]Request request,ProductDbContext context,
     IMapper mapper, CancellationToken cancellationToken)
    {
        
        var product = await context.Products
            .Where(x => x.Id == Guid.Parse(request.Id) && x.DeletedAt == null) 
            .ProjectTo<ProductDto>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(cancellationToken);

        if (product is null)
        {
            return TypedResults.NotFound(new ErrorResponse(
                details: "Get.Product.Failed",
                errors: "Could not find product",
                traceId: Activity.Current?.Id ?? ""
            )); 
        }

        return TypedResults.Ok(new SuccessResponse<ProductDto>(product));
    }
}
