using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Data.Repositories
{
    public interface IRepository<T, M>
        where T : class
        where M : class
    {
        Task<List<T>> GetAll();
        Task<T> Get(int id);
        Task<T> Add(M viewModel);
        Task<bool> Update(int id, M viewModel);
        Task<bool> Delete(int id);
    }
}