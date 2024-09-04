using System;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using SharedService.Responses;

namespace SearchService.Endpoints;

public class SearchProduct : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("v1/api/search", Handler)
           .WithTags("Search");
    }

    public record Request(
        [FromQuery]string SearchItem, 
        [FromQuery]int Page = 1, 
        [FromQuery]int PageSize = 5,
        [FromQuery]string OrderBy = "",
        [FromQuery]string FilterBy = "",
        [FromQuery]string FilterName = ""
    );

    public record Response(
        List<Product> Results, 
        int PageSize, 
        int PageCount, 
        long TotalCount
    );


    private async Task<Ok<SuccessResponse<Response>>> Handler([AsParameters] Request request)
    {
        var query = DB.PagedSearch<Product,Product>();

        if (!string.IsNullOrEmpty(request.SearchItem))
        {
            query.Match(Search.Full,request.SearchItem).SortByTextScore();
        }

        query = request.OrderBy switch
        {
            "ProductName" => query.Sort(x => x.Ascending(a => a.ProductName)),
            "StockLevel" => query.Sort(x => x.Ascending(a => a.StockLevel)),
            _ => query.Sort(x => x.Descending(a => a.CreatedAt))
        };

        query = request.FilterBy switch
        {
            "Status" => query.Match(a => a.Status == request.FilterName),
            "Category" => query.Match(x => x.CategoryName == request.FilterName),
            _ => query
        };

        query.PageNumber(request.Page);
        query.PageSize(request.PageSize);

        var result = await query.ExecuteAsync();

        var response = new Response(
            result.Results.ToList(),
            request.PageSize,
            result.PageCount,
            result.TotalCount
        );

        return TypedResults.Ok(new SuccessResponse<Response>(response));
    }
}
