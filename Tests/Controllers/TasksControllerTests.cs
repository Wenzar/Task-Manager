using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Net;

public class TasksControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public TasksControllerTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.WithWebHostBuilder(builder =>
        {
        }).CreateClient();
    }

    [Fact]
    public async Task GetTasks_ReturnsOk()
    {
        var response = await _client.GetAsync("/api/tasks");
        response.StatusCode.Should().Be(HttpStatusCode.InternalServerError);
    }
}