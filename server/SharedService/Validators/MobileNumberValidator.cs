


namespace SharedService.Validators;

public class MobileNumberValidator : AbstractValidator<string>
{
    public MobileNumberValidator()
    {
        RuleFor(x => x)
            .NotEmpty().WithMessage("Mobile number is required.")
            .Matches(@"^\+?[1-9]\d{1,14}$").WithMessage("Mobile number is not valid.");
    }
}