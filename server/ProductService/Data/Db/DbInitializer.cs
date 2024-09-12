using System;
using System.Diagnostics;

namespace ProductService.Data.Db;

public static class DbInitializer
{
    public static void InitializeDb(this WebApplication app)
    {
        using var scope = app?.Services.CreateScope();

        SeedData(scope.ServiceProvider.GetService<ProductDbContext>());
    }

    private static void SeedData(ProductDbContext context)
    {
        context.Database.Migrate();

        if(context.Products.Any())
        {
            Debug.WriteLine("Database already seeded");
            return;
        }

        var categories = new[]
        {
            new Category
            {
                Id = Guid.Parse("9e9690ea-a79c-414b-ab2b-1653d6905d9f"),
                CategoryName = "Food",
                CategoryDesc = "A category for food products",
            },
            new Category
            {
                Id = Guid.Parse("dd30eb7e-219b-4786-97a6-908e31c42026"),
                CategoryName = "Seasoning",
                CategoryDesc = "Use to spice up your food",
            }
        };
        context.AddRange(categories);

        var products = new List<Product>
        {
            new Product
            {
                Id = Guid.Parse("1d6a3ab5-f2a6-4d51-a801-f2c10192c8ff"),
                ProductName = "Juice Can",
                ProductDesc = "Product 6 ProductDesc",
                ImageLink = "https://via.placeholder.com/150",
                Unit = "Liters",
                Status = "Available",
                CostPrice = 200,
                SellingPrice = 250,
                StockLevel = 200,
                ReorderLevel = 20,
                Barcode = "1234567891",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CategoryId = categories[0].Id
            },
            new Product
            {
                Id = Guid.Parse("21720ae9-8ad0-4af8-8014-9bc974af2eaf"),
                ProductName = "Milk Carton",
                ProductDesc = "Product 10 ProductDesc",
                ImageLink = "https://via.placeholder.com/150",
                Unit = "Liters",
                Status = "OutOfStock",
                CostPrice = 200,
                SellingPrice = 250,
                StockLevel = 200,
                ReorderLevel = 20,
                Barcode = "1234567891",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                 CategoryId = categories[0].Id
            },
            new Product
            {
                Id = Guid.Parse("5fe2c501-afe3-4b6b-8234-38feb73e74dd"),
                ProductName = "Bread Loaf",
                ProductDesc = "Product 5 ProductDesc",
                ImageLink = "https://via.placeholder.com/150",
                Unit = "Pieces",
                Status = "Available",
                CostPrice = 200,
                SellingPrice = 250,
                StockLevel = 200,
                ReorderLevel = 20,
                Barcode = "1234567891",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                 CategoryId = categories[0].Id
            },
            new Product
            {
                Id = Guid.Parse("ae88fdfe-3989-421c-a8e0-b84a771e0e03"),
                ProductName = "Rice Bag",
                ProductDesc = "Product 9 ProductDesc",
                ImageLink = "https://via.placeholder.com/150",
                Unit = "kg",
                Status = "Available",
                CostPrice = 200,
                SellingPrice = 250,
                StockLevel = 200,
                ReorderLevel = 20,
                Barcode = "1234567891",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                 CategoryId = categories[0].Id
            },
            new Product
            {
                Id = Guid.Parse("5eea5fd5-ff69-46a0-87be-e786148d6086"),
                ProductName = "Egg Carton",
                ProductDesc = "Back soda",
                ImageLink = "http://example.com/image.jpggg",
                Unit = "Dozen",
                Status = "Active",
                CostPrice = 10.99m,
                SellingPrice = 15.99m,
                StockLevel = 100,
                ReorderLevel = 20,
                Barcode = "1234567890123",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                 CategoryId = categories[1].Id
            },
            new Product
            {
                Id = Guid.Parse("f34fc006-95b1-411b-bd8a-43746565ed52"),
                ProductName = "Apple Pack",
                ProductDesc = "Back soda",
                ImageLink = "http://example.com/image.jpggg",
                Unit = "Kg",
                Status = "Expired",
                CostPrice = 10.99m,
                SellingPrice = 15.99m,
                StockLevel = 100,
                ReorderLevel = 20,
                Barcode = "1234567890123",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CategoryId = categories[1].Id
            },
            new Product
            {
                Id = Guid.Parse("0e685100-7d84-4ff2-9916-6a71b51f513d"),
                ProductName = "Butter Pack",
                ProductDesc = "Back soda",
                ImageLink = "http://example.com/image.jpggg",
                Unit = "Boxes",
                Status = "Active",
                CostPrice = 10.99m,
                SellingPrice = 15.99m,
                StockLevel = 100,
                ReorderLevel = 20,
                Barcode = "1234567890123",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CategoryId = categories[0].Id
            },
            new Product
            {
                Id = Guid.Parse("f1b3b3b4-1b3b-4b3b-8b3b-3b3b3b3b3b3b"),
                ProductName = "Butter Loaf",
                ProductDesc = "Back soda",
                ImageLink = "http://example.com/image.jpggg",
                Unit = "Pieces",
                Status = "Active",
                CostPrice = 10.99m,
                SellingPrice = 15.99m,
                StockLevel = 100,
                ReorderLevel = 20,
                Barcode = "1234567890123",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CategoryId = categories[1].Id
            },
            new Product
            {
                Id = Guid.Parse("c8e1e7e7-9b7a-4e3e-8e9e-7e7e7e7e7e7e"),
                ProductName = "Orange Juice",
                ProductDesc = "Freshly squeezed orange juice",
                ImageLink = "https://via.placeholder.com/150",
                Unit = "Liters",
                Status = "Available",
                CostPrice = 150,
                SellingPrice = 200,
                StockLevel = 50,
                ReorderLevel = 10,
                Barcode = "9876543210",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CategoryId = categories[1].Id
            },
            new Product
            {
                Id = Guid.Parse("d9d8d7d6-d5d4-d3d2-d1d0-d9d8d7d6d5d4"),
                ProductName = "Chocolate Bar",
                ProductDesc = "Delicious chocolate bar",
                ImageLink = "https://via.placeholder.com/150",
                Unit = "Pieces",
                Status = "Available",
                CostPrice = 50,
                SellingPrice = 75,
                StockLevel = 100,
                ReorderLevel = 20,
                Barcode = "0123456789",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CategoryId = categories[1].Id
            }
        };

        context.AddRange(categories);
        context.AddRange(products);

        context.SaveChanges();
    }
}
