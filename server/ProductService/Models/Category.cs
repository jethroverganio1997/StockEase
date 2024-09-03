
namespace ProductService.Models;

[Table("Categories")]
public class Category
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string CategoryName { get; set; }    
    public required string CategoryDesc { get; set; } 
    
    // Navigation property
    public ICollection<Product> Products { get; } = new List<Product>();

}
