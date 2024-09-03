
namespace SearchService.Models;

public class Product : Entity
{
    public required string ProductName { get; set; }
    public required string ProductDesc { get; set; }
    public string ImageLink { get; set; }
    public required string Unit { get; set; }
    public required string Status { get; set; }
    public decimal CostPrice { get; set; }
    public decimal SellingPrice { get; set; }
    public int StockLevel { get; set; }
    public int ReorderLevel { get; set; }
    public string Barcode { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
    public required string CategoryName { get; set; }    
    public required string CategoryDesc { get; set; } 
}
