
using ProductService.Endpoints.Categories;
using ProductService.Endpoints.Products;

namespace ProductService.Helpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {

        CreateMap<Product, ProductDto>().IncludeMembers(x => x.Category);
        CreateMap<Category, ProductDto>();
        
        CreateMap<CreateProduct.Request, Product>();

        CreateMap<UpdateProduct.Request, Product>();

        CreateMap<CreateCategory.Request, Category>();
        CreateMap<Category, CategoryDto>();

        //use by rabbitmq consumer
        CreateMap<ProductDto, ProductCreated>();

        CreateMap<Product, ProductUpdated>().IncludeMembers(x => x.Category);
        CreateMap<Category, ProductUpdated>();
    }
}
