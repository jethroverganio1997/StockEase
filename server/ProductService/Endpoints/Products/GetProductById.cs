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

    public class Response
    {
        public Guid Id { get; init; }
        public string ProductName { get; init; }
        public string ProductDesc { get; init; }
        public string ImageLink { get; init; }
        public string Unit { get; init; }
        public string Status { get; init; }
        public decimal CostPrice { get; init; }
        public decimal SellingPrice { get; init; }
        public int StockLevel { get; init; }
        public int ReorderLevel { get; init; }
        public string Barcode { get; init; }
        public DateTime CreatedAt { get; init; }
        public DateTime UpdatedAt { get; init; }
        public string CategoryName { get; set; }
        public string CategoryDesc { get; set; }
    }

    public class RequestValidator : AbstractValidator<Request>
    {
        public RequestValidator()
        {
            RuleFor(x => x.Id).SetValidator(new GuidValidator());
        }
    }

    private async Task<Results<Ok<SuccessResponse<Response>>, NotFound<ErrorResponse>>> Handler([AsParameters]Request request,ProductDbContext context,
     IMapper mapper, CancellationToken cancellationToken)
    {
        
        var product = await context.Products
            .Where(x => x.Id == Guid.Parse(request.Id) && x.DeletedAt == null) 
            .ProjectTo<Response>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(cancellationToken);

        if (product is null)
        {
            return TypedResults.NotFound(new ErrorResponse(
                details: "Get.Product.Failed",
                errors: "Could not find product",
                traceId: Activity.Current?.Id ?? ""
            )); 
        }

        return TypedResults.Ok(new SuccessResponse<Response>(product));
    }
}
