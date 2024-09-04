using System;
using System.Diagnostics;

namespace SearchService.Consumers;

public class ProductDeletedConsumer : IConsumer<ProductDeleted>
{
    public async Task Consume(ConsumeContext<ProductDeleted> context)
    {
        Log.Information("--> Consuming product deleted: " + context.Message.Id);

        var result = await DB.DeleteAsync<Product>(context.Message.Id);

        if(!result.IsAcknowledged)
        {
            throw new MessageException(typeof(ProductDeleted),"Product delete failed");
        }
    }
}
