using System;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ProductService.Endpoints.Products;

public class GetAllProductUnit : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/v1/api/product-unit", Handler)
           .WithTags("Products")
           .WithSummary("Get all product units");
    }

    public record Response(
        Unit Id,
        string UnitName
    );

    private Ok<SuccessResponse<List<Response>>> Handler(CancellationToken cancellationToken)
    {   
        var units = Enum.GetValues<Unit>().Select(x => new Response(x, x.ToString())).ToList();
        
        return TypedResults.Ok(new SuccessResponse<List<Response>>(units));
    }
}
