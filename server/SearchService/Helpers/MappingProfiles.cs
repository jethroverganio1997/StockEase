namespace SearchService.Helpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<ProductCreated,Product>();
        CreateMap<ProductUpdated,Product>();
    }
}
