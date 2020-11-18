using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Data.Exceptions;
using Server.Models;

namespace Server.Data.Repositories.Implementation
{
    public class MovieRepository : IMovieRepository
    {
        private readonly ApplicationContext _context;

        public MovieRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<List<Movie>> GetAll()
        {
            return await _context.Movies.ToListAsync();
        }

        public async Task<Movie> Get(int id)
        {
            var entity = await _context.Movies.FindAsync(id);
            if (entity == null)
            {
                throw new MovieNotFoundException();
            }

            return entity;
        }

        public async Task<Movie> Add(Movie entity)
        {
            await _context.Movies.AddAsync(entity);
            await _context.SaveChangesAsync();

            if (entity == null)
            {
                throw new InvalidDataException("Movie not created");
            }

            return entity;
        }

        public async Task<List<MovieTag>> GetMovieTagsByIdMovie(int idMovie)
        {
            var movieTags = await _context.MovieHasMovieTags
                .Include(a => a.MovieTag)
                .Where(value => value.IdMovie == idMovie)
                .Select(tag => new MovieTag
                {
                    IdMovieTag = tag.MovieTag.IdMovieTag,
                    Name = tag.MovieTag.Name,
                })
                .ToListAsync();

            return movieTags;
        }

        public async Task<bool> Update(int id, Movie entity)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
            {
                throw new MovieNotFoundException();
            }

            movie.Name = entity.Name;
            movie.Description = entity.Description;
            movie.PictureUrl = entity.PictureUrl;

            _context.Movies.Update(movie);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(int id)
        {
            var entity = await _context.Movies.FindAsync(id);
            if (entity == null)
            {
                throw new MovieNotFoundException();
            }

            _context.Movies.Remove(entity);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task AddRelationsMovieHasMovieTags(int idMovie, IEnumerable<MovieTag> movieTags)
        {
            foreach (var entity in movieTags.Select(movieTag => new MovieHasMovieTag
                {IdMovieTag = movieTag.IdMovieTag, IdMovie = idMovie}))
            {
                await _context.MovieHasMovieTags.AddAsync(entity);
            }

            await _context.SaveChangesAsync();
        }

        private async Task DeleteRelationsMovieHasMovieTags(int idMovie, IEnumerable<MovieTag> movieTags)
        {
            var movieHasMovieTags = await _context.MovieHasMovieTags.Where(a => a.IdMovie == idMovie).ToListAsync();

            var hasMovieTags = movieHasMovieTags
                .Where(x => movieTags.Select(o => o.IdMovieTag).Contains(x.IdMovieTag))
                .ToList();

            foreach (var entity in hasMovieTags)
            {
                _context.MovieHasMovieTags.Remove(entity);
            }

            await _context.SaveChangesAsync();
        }

        public async Task UpdateRelationsMovieHasMovieTags(int idMovie, ICollection<MovieTag> movieTags)
        {
            var tagsByIdMovie = await GetMovieTagsByIdMovie(idMovie);

            var addMovieTags = movieTags.Where(a => tagsByIdMovie.All(b => b.IdMovieTag != a.IdMovieTag)).ToList();
            var deleteMovieTags = tagsByIdMovie.Where(a => movieTags.All(b => b.IdMovieTag != a.IdMovieTag)).ToList();

            if (addMovieTags.Count > 0)
            {
                await AddRelationsMovieHasMovieTags(idMovie, addMovieTags);
            }

            if (deleteMovieTags.Count > 0)
            {
                await DeleteRelationsMovieHasMovieTags(idMovie, deleteMovieTags);
            }
        }
    }
}
