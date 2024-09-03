using System;

namespace SharedService.Responses;

public class SuccessResponse<TData>
{
    public string Status { get; set; } = "success";
    public TData Data { get; set; }

    public SuccessResponse(TData data)
    {
        Data = data;
    }
}
