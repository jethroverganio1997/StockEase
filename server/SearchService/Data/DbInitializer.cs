


using System.Text.Json;

namespace SearchService.Data;

public static class DbInitializer
{
    public static async Task InitDb(this WebApplication app)
    {
        await DB.InitAsync("SearchDb", MongoClientSettings.FromConnectionString(app.Configuration.GetConnectionString("MongoDbConnection")));


        await DB.Index<Product>()
            .Key(x => x.ProductName , KeyType.Text)
            .Key(x => x.CategoryName , KeyType.Text)
            .Key(x => x.Status , KeyType.Text)
            .Key(x => x.Unit , KeyType.Text)
            .CreateAsync(); 

         var count = await DB.CountAsync<Product>();

         if(count != 0) return;

         var itemData = await File.ReadAllTextAsync("Data/products.json");
#pragma warning disable CA1869 // Cache and reuse 'JsonSerializerOptions' instances
        var options = new JsonSerializerOptions{ PropertyNameCaseInsensitive = true };
#pragma warning restore CA1869 // Cache and reuse 'JsonSerializerOptions' instances
        var items = JsonSerializer.Deserialize<List<Product>>(itemData, options);

         await DB.SaveAsync(items);
    }

            
}
