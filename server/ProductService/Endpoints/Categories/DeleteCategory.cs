using System;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace ProductService.Endpoints.Categories;

public class DeleteCategory : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapDelete("/v1/api/category/{Id}", Handler)
            .WithTags("Category")
            .WithSummary("Delete a category by Guid ID")
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

    private async Task<Results<Ok<SuccessResponse<string>>, NotFound<ErrorResponse>, UnprocessableEntity<ErrorResponse>>> Handler(
    [AsParameters]Request request, ProductDbContext context, IMapper mapper,  CancellationToken cancellationToken)
    {
        // check if category exists
        var category = await context.Categories
            .FirstOrDefaultAsync(x => x.Id == Guid.Parse(request.Id), cancellationToken);

        if (category == null)
        {
            return TypedResults.NotFound(new ErrorResponse(
                details: "Category not found",
                errors: "Could not find category with the specified ID",
                traceId: Activity.Current?.Id ?? ""
            ));
        }

        // delete category
        context.Categories.Remove(category);

        var result = await context.SaveChangesAsync(cancellationToken);

        // check if category was deleted
        if (result == 0)
        {
            return TypedResults.UnprocessableEntity(new ErrorResponse(
                details: "Delete category failed",
                errors: "Could not delete category, Please try again later",
                traceId: Activity.Current?.Id ?? ""
            ));
        }

        return TypedResults.Ok(new SuccessResponse<string>("Category deleted successfully"));
    }
}
