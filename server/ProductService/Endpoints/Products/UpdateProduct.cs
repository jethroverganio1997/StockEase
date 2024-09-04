using System;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ProductService.Endpoints.Products;

public class UpdateProduct : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app) => app
        .MapPut("/v1/api/products",  Handler)
        .WithTags("Products")
        .WithSummary("Update a product")
        .AddEndpointFilter<EnsureBodyDataExistsFilter<Request>>()
        .WithRequestValidation<Request>();

    public record Request(
        Guid id,
        string ProductName,
        string ProductDesc,
        string ImageLink,
        string Unit,
        string Status,
        decimal? CostPrice,
        decimal? SellingPrice,
        int? ReorderLevel,
        string Barcode,
        Guid? CategoryId
    );

    public class RequestValidator : AbstractValidator<Request>
    {
        public RequestValidator()
        {
            RuleFor(x => x.id).NotEmpty();
        }
    }


    private async Task<Results<Ok<SuccessResponse<string>>, NotFound<ErrorResponse>, UnprocessableEntity<ErrorResponse>>> Handler(Request request, 
    ProductDbContext context, IMapper mapper,IPublishEndpoint publishEndpoint, CancellationToken cancellationToken)
    {
        var product = await context.Products
            .Include(x => x.Category)
            .FirstOrDefaultAsync(x => x.Id == request.id, cancellationToken);


        if (product == null) 
        {
            return TypedResults.NotFound(new ErrorResponse(
                details: "Update product failed",
                errors: "Could not find product, Please try again later",
                traceId: Activity.Current?.Id ?? ""
            )); 
        }

        product.ProductName = request.ProductName ?? product.ProductName;
        product.ProductDesc = request.ProductDesc ?? product.ProductDesc;
        product.ImageLink = request.ImageLink ?? product.ImageLink;
        product.Unit = request.Unit ?? product.Unit;
        product.Status = request.Status ?? product.Status;
        product.CostPrice = request.CostPrice ?? product.CostPrice;
        product.SellingPrice = request.SellingPrice ?? product.SellingPrice;
        product.ReorderLevel = request.ReorderLevel ?? product.ReorderLevel;
        product.Barcode = request.Barcode ?? product.Barcode;
        product.CategoryId = request.CategoryId ?? product.CategoryId;
        product.UpdatedAt = DateTime.UtcNow;

        await publishEndpoint.Publish(mapper.Map<ProductUpdated>(product), cancellationToken);

        var result = await context.SaveChangesAsync(cancellationToken);

        if(result == 0)
        {
            return TypedResults.UnprocessableEntity(new ErrorResponse(
                details: "Update product failed",
                errors: "Could not update product, Please try again later",
                traceId: Activity.Current?.Id ?? ""
            ));
        }

        return TypedResults.Ok(new SuccessResponse<string>("Product updated successfully"));
    }
 
}
