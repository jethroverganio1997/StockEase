
namespace ProductService.Data.Db;

public class ProductDbContext : DbContext
{

    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public ProductDbContext(DbContextOptions options) : base(options)
    {
        
    }
}
