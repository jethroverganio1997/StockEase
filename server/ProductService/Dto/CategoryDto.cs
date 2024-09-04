using System;

namespace ProductService.Dto;

public class CategoryDto
{
    public Guid Id { get; set; }
    public string CategoryName { get; set; }
    public string CategoryDesc { get; set; }
}
