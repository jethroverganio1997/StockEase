
using Microsoft.AspNetCore.Http.HttpResults;

namespace ProductService.Endpoints.Products;

public class CreateProduct : IEndpoint 
{
    public void MapEndpoint(IEndpointRouteBuilder app) => app
        .MapPost("/v1/api/products",  Handler)
        .WithTags("Products")
        .WithSummary("Create a new product")
        .AddEndpointFilter<EnsureBodyDataExistsFilter<Request>>()
        .WithRequestValidation<Request>();

    
    public record Request
    {
        [Required]
        public string ProductName { get; init; }
        [Required]
        public string ProductDesc { get; init; }
        public string ImageLink { get; init; }
        
        [Required]
        public string Unit { get; init; }
        [Required]
        public string Status { get; init; }
        [Required]
        public decimal CostPrice { get; init; }
        [Required]
        public decimal SellingPrice { get; init; }
        
        [Required]
        public int ReorderLevel { get; init; }
        public string Barcode { get; init; }
        [Required]
        public Guid CategoryId { get; init; }
    }

    public class RequestValidator : AbstractValidator<Request>
    {
        public RequestValidator()
        {
            RuleFor(x => x.ProductName).NotEmpty();
            RuleFor(x => x.ProductDesc).NotEmpty();
            RuleFor(x => x.Unit).NotEmpty();
            RuleFor(x => x.Status).NotEmpty();
            RuleFor(x => x.CostPrice).NotEmpty();
            RuleFor(x => x.SellingPrice).NotEmpty();
            RuleFor(x => x.ReorderLevel).NotEmpty();
            RuleFor(x => x.CategoryId.ToString()).SetValidator(new GuidValidator());
        }
    }

    private async Task<Results<Ok<SuccessResponse<string>>, UnprocessableEntity<ErrorResponse>>> Handler(Request request, 
    ProductDbContext context, IMapper mapper, CancellationToken cancellationToken)
    {
        var product = mapper.Map<Product>(request);
        context.Products.Add(product);

        var result = await context.SaveChangesAsync(cancellationToken);

        if(result == 0)
        {
            return TypedResults.UnprocessableEntity(new ErrorResponse(
                details: "Create product failed",
                errors: "Could not save product, Please try again later",
                traceId: Activity.Current?.Id ?? ""
            ));
        }

        return TypedResults.Ok(new SuccessResponse<string>($"Successfully created new product {product.ProductName}"));
    }
 
}

