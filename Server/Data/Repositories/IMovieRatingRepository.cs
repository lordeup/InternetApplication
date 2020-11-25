using System.Threading.Tasks;
using Server.Models;
using Server.ViewModels;

namespace Server.Data.Repositories
{
    public interface IMovieRatingRepository : IRepository<MovieRating>
    {
        Task<RatingViewModel> GetRatingByIdMovie(int idMovie);

        Task<MovieRating> GetMovieRatingByIdUserAndIdMovie(int idUser, int idMovie);
    }
}
