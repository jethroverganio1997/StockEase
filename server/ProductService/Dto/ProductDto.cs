using System;

namespace ProductService.Dto;

public class ProductDto
{
    public Guid Id { get; set; }
    public string ProductName { get; set; }
    public string ProductDesc { get; set; }
    public string ImageLink { get; set; }
    public string Unit { get; set; }
    public string Status{ get; set; } 
    public decimal CostPrice { get; set; }
    public decimal SellingPrice { get; set; }
    public int StockLevel { get; set; }
    public int ReorderLevel { get; set; }
    public string Barcode{ get; set; }
    public DateTime CreatedAt{ get; set; }
    public DateTime UpdatedAt{ get; set; }
    public string CategoryName{ get; set; }
    public string CategoryDesc{ get; set; }
}
