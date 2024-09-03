using System;

namespace SharedService.Responses;

public class ErrorResponse
{
    public string Status { get; set; } = "error";
    public string Details { get; set; }
    public object Errors { get; set; } = Array.Empty<object>();
    public string TraceId { get; set; }

    public ErrorResponse(string details, object errors, string traceId)
    {
        Details = details;
        Errors = errors;
        TraceId = traceId;
    }
}
// {
//   "status": "error",
//   "details": "Failed to read parameter \"Request request\" from the request body as JSON.",
//   "errors": {
//     "exceptionMessage": "An error occurred while processing your request."
//   },
//   "traceId": "00-0b050d19e91799861f97a17bcdb16d9c-85c203039de86815-00"
// }


// {
//   "status": "error",
//   "details": "Validation failed.",
//   "errors": [
//     {
//       "propertyName": "Id",
//       "errorMessage": "Invalid Guid format."
//     }
//   ],
//   "traceId": "00-7aa61270fdb9647cdac0e97be5aa427a-f00363da51f92764-00"
// }

// {
//   "status": "error",
//   "details": "Validation failed.",
//   "errors": Invalid Guid format,
//   "traceId": "00-7aa61270fdb9647cdac0e97be5aa427a-f00363da51f92764-00"
// }
