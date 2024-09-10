using System;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using SharedService.Responses;

namespace SearchService.Endpoints;

public class SearchProductEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("v1/api/search", Handler)
           .WithTags("Search");
    }

    public record Request(
        [FromQuery]string SearchItem, 
        [FromQuery]string CategoryFilter,
        [FromQuery]string OrderBy,
        [FromQuery]string PriceFilter,
        [FromQuery]string StocksFilter,
        [FromQuery]int PageIndex = 1, 
        [FromQuery]int PageSize = 5
    );

    public record Response(
        List<Product> Results, 
        int PageIndex,
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

        if (!string.IsNullOrEmpty(request.CategoryFilter))
        {
            query.Match(x => x.CategoryName == request.CategoryFilter);
        }

        
        if (!string.IsNullOrEmpty(request.PriceFilter))
        {
            var parts = request.PriceFilter.Split('-');
            var min = decimal.Parse(parts[0]);
            var max = decimal.Parse(parts[1]);

            if (max > 0)
            {
                query.Match(x => x.SellingPrice >= min && x.SellingPrice <= max);
            }
            else
            {
                query.Match(x => x.SellingPrice >= min);
            }
        }

        if (!string.IsNullOrEmpty(request.StocksFilter))
        {
            var parts = request.StocksFilter.Split('-');
            var min = int.Parse(parts[0]);
            var max = int.Parse(parts[1]);

            if (max > 0)
            {
                query.Match(x => x.StockLevel >= min && x.StockLevel <= max);
            }
            else
            {
                query.Match(x => x.StockLevel >= min);
            }
        }

        query = request.OrderBy switch
        {
            "ProductName" => query.Sort(x => x.Ascending(a => a.ProductName)),
            "StockLevel" => query.Sort(x => x.Ascending(a => a.StockLevel)),
            _ => query.Sort(x => x.Descending(a => a.CreatedAt))
        };


        query.PageNumber(request.PageIndex);
        query.PageSize(request.PageSize);

        var result = await query.ExecuteAsync();

        var response = new Response(
            result.Results.ToList(),
            request.PageIndex,
            request.PageSize,
            result.PageCount,
            result.TotalCount
        );

        return TypedResults.Ok(new SuccessResponse<Response>(response));
    }
}
