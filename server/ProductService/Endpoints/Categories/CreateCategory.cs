
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace ProductService.Endpoints.Categories;

public class CreateCategory : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {   
        app.MapPost("/v1/api/category", Handler)
            .WithTags("Category")
            .WithSummary("Create a new category")
            .AddEndpointFilter<EnsureBodyDataExistsFilter<Request>>()
            .WithRequestValidation<Request>();
    }

    public record Request
    {
        [Required]
        public string CategoryName { get; init; }
        
        [Required]
        public string CategoryDesc { get; init; }
    }

    public class RequestValidator : AbstractValidator<Request>
    {
        public RequestValidator()
        {
            RuleFor(x => x.CategoryName).NotEmpty();
            RuleFor(x => x.CategoryDesc).NotEmpty();
        }
    }

    private async Task<Results<Ok<SuccessResponse<CategoryDto>>,BadRequest<ErrorResponse>, UnprocessableEntity<ErrorResponse>>> Handler(
    [FromBody]Request request, ProductDbContext context, IMapper mapper, CancellationToken cancellationToken)
    {

        var category = mapper.Map<Category>(request);
        context.Categories.Add(category);

        var result = await context.SaveChangesAsync(cancellationToken);

        if(result == 0)
        {
            return TypedResults.UnprocessableEntity(new ErrorResponse(
                details: "Create category failed",
                errors: "Could not save category, Please try again later",
                traceId: Activity.Current?.Id ?? ""
            ));
        }

        var newCategory = mapper.Map<CategoryDto>(category);

        return TypedResults.Ok(new SuccessResponse<CategoryDto>(newCategory));
    }
}
