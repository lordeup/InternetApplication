using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Data.Repositories
{
    public interface IReviewRepository : IRepository<Review>
    {
        Task<List<Review>> GetReviewsByIdUser(int idUser);

        Task<List<Review>> GetReviewsByIdMovie(int idMovie);
    }
}
