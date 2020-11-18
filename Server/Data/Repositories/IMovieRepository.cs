using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Data.Repositories
{
    public interface IMovieRepository : IRepository<Movie>
    {
        Task<List<MovieTag>> GetMovieTagsByIdMovie(int idMovie);

        Task AddRelationsMovieHasMovieTags(int idMovie, IEnumerable<MovieTag> movieTags);

        Task UpdateRelationsMovieHasMovieTags(int idMovie, ICollection<MovieTag> movieTags);
    }
}
