using System.Text.Json;
using TaskManager.API.Models;

namespace TaskManager.API.Services.Interfaces
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetAllAsync(int userId);
        Task<TaskItem?> GetByIdAsync(int id, int userId);
        Task<TaskItem> CreateAsync(TaskItem task, int userId);
        Task<bool> UpdateAsync(TaskItem task, int userId);
        Task<bool> PatchAsync(int id, JsonElement patchData, int userId);
        Task<bool> DeleteAsync(int id, int userId);
    }
}
