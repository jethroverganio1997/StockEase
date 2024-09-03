
namespace ProductService.Models;

[Table("Products")]
public class Product
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string ProductName { get; set; }
    public required string ProductDesc { get; set; }
    public string ImageLink { get; set; }
    public required string Unit { get; set; }
    public required string Status { get; set; }
    public decimal CostPrice { get; set; }
    public decimal SellingPrice { get; set; }
    public int StockLevel { get; set; } = 0;
    public int ReorderLevel { get; set; }
    public string Barcode { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; }= DateTime.UtcNow;
    public DateTime? DeletedAt { get; set; }

    // Navigation properties
    public Category Category { get; set; }
    public Guid CategoryId { get; set; }
}
