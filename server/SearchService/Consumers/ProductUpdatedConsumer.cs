using System;

namespace SearchService.Consumers;

public class ProductUpdatedConsumer : IConsumer<ProductUpdated>
{
    private readonly IMapper _mapper;

    public ProductUpdatedConsumer(IMapper mapper)
    {
        _mapper = mapper;
    }
    public async Task Consume(ConsumeContext<ProductUpdated> context)
    {
        Log.Information("--> Consuming product updated: " + context.Message.Id);

        var product = _mapper.Map<Product>(context.Message);

        var result = await DB.Update<Product>()
            .Match(a => a.ID == context.Message.Id)
            .ModifyOnly(x => new
            {
                x.ProductName,
                x.ProductDesc,
                x.ImageLink,
                x.Unit,
                x.Status,
                x.CostPrice,
                x.SellingPrice,
                x.StockLevel,
                x.ReorderLevel,
                x.Barcode,
                x.CreatedAt,
                x.UpdatedAt,
                x.CategoryName,
                x.CategoryDesc,
            }, product)
            .ExecuteAsync();

        if(!result.IsAcknowledged)
        {
            throw new MessageException(typeof(ProductUpdated),"Product update failed");
        }
    }
}
