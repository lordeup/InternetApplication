using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Data.Repositories
{
    public interface IMovieHasMovieTagRepository : IRepository<MovieHasMovieTag>
    {
        Task<List<MovieTag>> GetMovieTagsByIdMovie(int idMovie);

        Task<List<Movie>> FindMoviesByMovieTags(IEnumerable<MovieTag> movieTags);

        Task AddRelationsMovieHasMovieTags(int idMovie, IEnumerable<MovieTag> movieTags);

        Task UpdateRelationsMovieHasMovieTags(int idMovie, ICollection<MovieTag> movieTags);
    }
}
