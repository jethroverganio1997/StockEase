using System;
using System.Diagnostics;

namespace ProductService.Data.Db;

public static class DbInitializer
{
    public static void InitDb(WebApplication app)
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
                CategoryName = "Category 1",
                CategoryDesc = "Category 1 ProductDesc",
            },
            new Category
            {
                Id = Guid.Parse("dd30eb7e-219b-4786-97a6-908e31c42026"),
                CategoryName = "Category 2",
                CategoryDesc = "Category 2 ProductDesc",
            }
        };
        context.AddRange(categories);

        var products = new Product[]
        {
            new Product
            {
                ProductName = "Product 1",
                ProductDesc = "Product 1 ProductDesc",
                ImageLink = "https://via.placeholder.com/150",
                Unit = Unit.Piece.ToString(),
                Status = Status.Active.ToString(),
                CostPrice = 100,
                SellingPrice = 150,
                StockLevel = 100,
                ReorderLevel = 10,
                Barcode = "1234567890",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CategoryId = categories[1].Id,
            },
            new Product
            {
                ProductName = "Product 2",
                ProductDesc = "Product 2 ProductDesc",
                ImageLink = "https://via.placeholder.com/150",
                Unit = Unit.Piece.ToString(),
                Status = Status.Active.ToString(),
                CostPrice = 200,
                SellingPrice = 250,
                StockLevel = 200,
                ReorderLevel = 20,
                Barcode = "1234567891",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CategoryId = categories[1].Id,
            },
            new Product
            {
                ProductName = "Product 3",
                ProductDesc = "Product 3 ProductDesc",
                ImageLink = "https://via.placeholder.com/150",
                Unit = Unit.Piece.ToString(),
                Status = Status.Active.ToString(),
                CostPrice = 200,
                SellingPrice = 250,
                StockLevel = 200,
                ReorderLevel = 20,
                Barcode = "1234567891",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CategoryId = categories[1].Id,

            },
            new Product
            {
                ProductName = "Product 4",
                ProductDesc = "Product 4 ProductDesc",
                ImageLink = "https://via.placeholder.com/150",
                Unit = Unit.Piece.ToString(),
                Status = Status.Active.ToString(),
                CostPrice = 200,
                SellingPrice = 250,
                StockLevel = 200,
                ReorderLevel = 20,
                Barcode = "1234567891",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CategoryId = categories[1].Id,
            },
            new Product
            {
                ProductName = "Product 5",
                ProductDesc = "Product 5 ProductDesc",
                ImageLink = "https://via.placeholder.com/150",
                Unit = Unit.Piece.ToString(),
                Status = Status.Active.ToString(),
                CostPrice = 200,
                SellingPrice = 250,
                StockLevel = 200,
                ReorderLevel = 20,
                Barcode = "1234567891",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CategoryId = categories[0].Id,
            },
            new Product
            {
                ProductName = "Product 6",
                ProductDesc = "Product 6 ProductDesc",
                ImageLink = "https://via.placeholder.com/150",
                Unit = Unit.Piece.ToString(),
                Status = Status.Active.ToString(),
                CostPrice = 200,
                SellingPrice = 250,
                StockLevel = 200,
                ReorderLevel = 20,
                Barcode = "1234567891",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CategoryId = categories[0].Id,
            },
            new Product
            {
                ProductName = "Product 7",
                ProductDesc = "Product 7 ProductDesc",
                ImageLink = "https://via.placeholder.com/150",
                Unit = Unit.Piece.ToString(),
                Status = Status.Active.ToString(),
                CostPrice = 200,
                SellingPrice = 250,
                StockLevel = 200,
                ReorderLevel = 20,
                Barcode = "1234567891",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CategoryId = categories[0].Id,
            },
            new Product
            {
                ProductName = "Product 8",
                ProductDesc = "Product 8 ProductDesc",
                ImageLink = "https://via.placeholder.com/150",
                Unit = Unit.Piece.ToString(),
                Status = Status.Active.ToString(),
                CostPrice = 200,
                SellingPrice = 250,
                StockLevel = 200,
                ReorderLevel = 20,
                Barcode = "1234567891",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CategoryId = categories[1].Id,
            },
            new Product
            {
                ProductName = "Product 9",
                ProductDesc = "Product 9 ProductDesc",
                ImageLink = "https://via.placeholder.com/150",
                Unit = Unit.Piece.ToString(),
                Status = Status.Active.ToString(),
                CostPrice = 200,
                SellingPrice = 250,
                StockLevel = 200,
                ReorderLevel = 20,
                Barcode = "1234567891",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CategoryId = categories[0].Id,
            },
            new Product
            {
                ProductName = "Product 10",
                ProductDesc = "Product 10 ProductDesc",
                ImageLink = "https://via.placeholder.com/150",
                Unit = Unit.Piece.ToString(),
                Status = Status.Active.ToString(),
                CostPrice = 200,
                SellingPrice = 250,
                StockLevel = 200,
                ReorderLevel = 20,
                Barcode = "1234567891",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CategoryId = categories[0].Id,
            },
            
        };

        context.AddRange(categories);
        context.AddRange(products);

        context.SaveChanges();
    }
}
