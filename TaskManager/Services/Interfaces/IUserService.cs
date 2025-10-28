using TaskManager.API.DTOs;
using TaskManager.API.Models;

namespace TaskManager.API.Services.Interfaces
{
    public interface IUserService
    {
        Task<User?> RegisterAsync(UserDto dto);
        Task<string?> LoginAsync(UserDto dto);
        Task<User?> GetByIdAsync(int id);
    }
}
