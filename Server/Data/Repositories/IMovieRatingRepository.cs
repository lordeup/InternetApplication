using System.Threading.Tasks;
using Server.Models;

namespace Server.Data.Repositories
{
    public interface IMovieRatingRepository : IRepository<MovieRating>
    {
        Task<double> GetRatingByIdMovie(int idMovie);

        Task<MovieRating> GetMovieRatingByIdUserAndIdMovie(int idUser, int idMovie);
    }
}
