
using ProductService.Endpoints.Categories;
using ProductService.Endpoints.Products;

namespace ProductService.Helpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {

        CreateMap<CreateProduct.Request, Product>();

        CreateMap<Product, GetProductById.Response>().IncludeMembers(x => x.Category);
        CreateMap<Category, GetProductById.Response>();

        CreateMap<UpdateProduct.Request, Product>();

        CreateMap<CreateCategory.Request, Category>();

        CreateMap<Category, GetAllCategory.Response>();
    }
}
