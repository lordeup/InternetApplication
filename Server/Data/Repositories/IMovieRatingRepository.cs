using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Data.Repositories
{
    public interface IMovieRatingRepository : IRepository<MovieRating>
    {
        Task<List<MovieRating>> GetMovieRatingsByIdUser(int idUser);

        Task<List<MovieRating>> GetMovieRatingsByIdMovie(int idMovie);

        Task<float> GetRatingByIdMovie(int idMovie);
    }
}
