
using System.Diagnostics;

namespace SearchService.Consumers;

public class ProductCreatedConsumer : IConsumer<ProductCreated>
{
    private readonly IMapper _mapper;

    public ProductCreatedConsumer(IMapper mapper)
    {
        _mapper = mapper;
    }
    public async Task Consume(ConsumeContext<ProductCreated> context)
    {
        Log.Information("--> Consuming product created: " + context.Message.Id);

        var product = _mapper.Map<Product>(context.Message);

        //TODO remove for test
        if(product.ProductName == "FooBar")
        {
            throw new ArgumentException("Product name is invalid");
        }

        await product.SaveAsync();
    }
}
