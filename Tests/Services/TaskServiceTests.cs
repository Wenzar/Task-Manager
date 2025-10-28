using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using TaskManager.API.Data;
using TaskManager.API.Models;
using TaskManager.API.Services;

public class TaskServiceTests
{
    private AppDbContext GetInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "TaskDb_Test")
            .Options;

        return new AppDbContext(options);
    }

    [Fact]
    public async Task CreateAsync_ShouldSaveTask()
    {
        var db = GetInMemoryDbContext();
        var service = new TaskService(db);
        var task = new TaskItem { Title = "Test Task", Description = "Desc", Status = "todo" };

        var result = await service.CreateAsync(task, userId: 1);

        result.Should().NotBeNull();
        result.Title.Should().Be("Test Task");

        var fromDb = await db.Tasks.FirstAsync();
        fromDb.Title.Should().Be("Test Task");
    }
}
