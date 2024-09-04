using System;

namespace ProductService.Consumers;

public class ProductCreatedFaultConsumer : IConsumer<Fault<ProductCreated>>
{
    public async Task Consume(ConsumeContext<Fault<ProductCreated>> context)
    {   
        Log.Information("--> Consuming product created fault: " + context.Message.Message.Id);

        var exception = context.Message.Exceptions.FirstOrDefault();

        //TODO* handle logical error when product is at fault
        //from product service to search service,
        //error from rabbitmq fault queue will be sent here and check the exception type
        //you can add logic to fix if exception can be fix
        //and finally throw an error if the exception cannot be fix
        if (exception.ExceptionType == "System.ArgumentException")
        {
            context.Message.Message.ProductName = "FooBarChat";
            await context.Publish(context.Message.Message);
        }
        else
        {
            Log.Error(exception.Message, "An error occurred while processing the message");
            throw new UnhandledEventException("ProductService","ProductCreatedFaultConsumer.Consume",exception.Message);
        }
    }
}
