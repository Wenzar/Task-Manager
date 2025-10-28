using FluentValidation;
using TaskManager.API.Models;

namespace TaskManager.API.Validators
{
    public class TaskItemValidator : AbstractValidator<TaskItem>
    {
        public TaskItemValidator()
        {
            RuleFor(t => t.Title)
                .NotEmpty().WithMessage("Title обязателен")
                .MaximumLength(100);

            RuleFor(t => t.Description)
                .NotEmpty().WithMessage("Description обязательна");

            RuleFor(t => t.Status)
                .Must(s => new[] { "todo", "in-progress", "done" }.Contains(s))
                .WithMessage("Недопустимый статус");
        }
    }
}
