using System;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ProductService.Endpoints.Categories;

public class GetAllCategoryEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/v1/api/products/category", Handler)
           .WithTags("Category")
           .WithSummary("Get all categories");
    }

    private async Task<Ok<SuccessResponse<List<CategoryDto>>>> Handler(ProductDbContext context, IMapper mapper, 
    CancellationToken cancellationToken)
    {
        var categories = await context.Categories
            .ProjectTo<CategoryDto>(mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        return TypedResults.Ok(new SuccessResponse<List<CategoryDto>>(categories));
    }
}
