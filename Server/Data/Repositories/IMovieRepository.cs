using System.Collections.Generic;
using Server.Models;

namespace Server.Data.Repositories
{
    public interface IMovieRepository : IRepository<Movie>
    {
        List<Movie> FindMoviesByMovieName(string movieName);
    }
}
