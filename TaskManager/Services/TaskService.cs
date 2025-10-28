using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using TaskManager.API.Data;
using TaskManager.API.Models;
using TaskManager.API.Services.Interfaces;

namespace TaskManager.API.Services
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;
        public TaskService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskItem>> GetAllAsync(int userId)
        {
            return await _context.Tasks
                .Where(t => t.UserId == userId)
                .ToListAsync();
        }

        public async Task<TaskItem?> GetByIdAsync(int id, int userId)
        {
            return await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
        }

        public async Task<TaskItem> CreateAsync(TaskItem task, int userId)
        {
            task.UserId = userId;
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<bool> UpdateAsync(TaskItem task, int userId)
        {
            var existing = await GetByIdAsync(task.Id, userId);
            if (existing == null) return false;

            existing.Title = task.Title;
            existing.Description = task.Description;
            existing.IsCompleted = task.IsCompleted;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> PatchAsync(int id, JsonElement patchData, int userId)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            if (task == null) return false;

            var updates = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(patchData.GetRawText());

            foreach (var kvp in updates)
            {
                switch (kvp.Key.ToLower())
                {
                    case "title":
                        task.Title = kvp.Value.GetString();
                        break;
                    case "description":
                        task.Description = kvp.Value.GetString();
                        break;
                    case "status":
                        task.Status = kvp.Value.GetString();
                        break;
                }
            }

            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteAsync(int id, int userId)
        {
            var task = await GetByIdAsync(id, userId);
            if (task == null) return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
