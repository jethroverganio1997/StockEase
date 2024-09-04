
using Microsoft.AspNetCore.Http.HttpResults;
using ProductService.Dto;

namespace ProductService.Endpoints.Products;

public class CreateProductEndpoint : IEndpoint 
{
    public void MapEndpoint(IEndpointRouteBuilder app) => app
        .MapPost("/v1/api/products",  Handler)
        .WithTags("Products")
        .WithSummary("Create a new product")
        .AddEndpointFilter<EnsureBodyDataExistsFilter<Request>>()
        .WithRequestValidation<Request>()
        .RequireAuthorization();

    
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

    private async Task<Results<Ok<SuccessResponse<ProductDto>>, UnprocessableEntity<ErrorResponse>>> Handler(
        Request request, 
        ProductDbContext context, 
        IMapper mapper,
        IPublishEndpoint publishEndpoint, 
        HttpContext httpContext,
        CancellationToken cancellationToken)
    {
        Log.Information($"---> Creating a new product: {httpContext.User.Identity.Name}");

        var product = mapper.Map<Product>(request);

        var exist = context.Products.Any(x => x.ProductName == product.ProductName);
        if(exist)
        {
            return TypedResults.UnprocessableEntity(new ErrorResponse(
                details: "Create product failed",
                errors: "Product already exist",
                traceId: Activity.Current?.Id ?? ""
            ));
        }

        context.Products.Add(product);

        var category = await context.Categories.FirstOrDefaultAsync(c => c.Id == product.CategoryId, cancellationToken);

        var newProduct = mapper.Map<ProductDto>(product);
        newProduct.CategoryName = category.CategoryName;
        newProduct.CategoryDesc = category.CategoryDesc;

        await publishEndpoint.Publish(mapper.Map<ProductCreated>(newProduct), cancellationToken);

        var result = await context.SaveChangesAsync(cancellationToken);
        if(result == 0)
        {
            return TypedResults.UnprocessableEntity(new ErrorResponse(
                details: "Create product failed",
                errors: "Could not save product, Please try again later",
                traceId: Activity.Current?.Id ?? ""
            ));
        }

        return TypedResults.Ok(new SuccessResponse<ProductDto>(newProduct));
    }
 
}

