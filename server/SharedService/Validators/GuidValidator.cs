using System;

namespace SharedService.Validators;

public class GuidValidator : AbstractValidator<string>
{
    public GuidValidator()
    {
        RuleFor(x => x)
            .NotEmpty()
            .WithMessage("Guid cannot be empty.")
            .Must(BeAValidGuid)
            .WithMessage("Invalid Guid format.");
    }

    private bool BeAValidGuid(string guid)
    {
        return Guid.TryParse(guid, out _);
    }
}
