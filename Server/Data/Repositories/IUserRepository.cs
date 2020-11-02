using System.Threading.Tasks;
using Server.Models;
using Server.ViewModels;

namespace Server.Data.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> LoginUser(LoginUserViewModel viewModel);
        Task<User> RegisterUser(RegisterUserViewModel viewModel);
    }
}