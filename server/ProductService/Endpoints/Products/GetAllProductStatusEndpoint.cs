using System;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ProductService.Endpoints.Products;

public class GetAllProductStatusEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/v1/api/product-status", Handler)
           .WithTags("Products")
           .WithSummary("Get all product status");
    }

    public record Response(
        Status Id,
        string StatusName
    );

    private Ok<SuccessResponse<List<Response>>> Handler(CancellationToken cancellationToken)
    {   
        var status = Enum.GetValues<Status>().Select(x => new Response(x, x.ToString())).ToList();
        
        return TypedResults.Ok(new SuccessResponse<List<Response>>(status));
    }

}
