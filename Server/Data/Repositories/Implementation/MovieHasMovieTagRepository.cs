using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Data.Exceptions;
using Server.Models;

namespace Server.Data.Repositories.Implementation
{
    public class MovieHasMovieTagRepository : IMovieHasMovieTagRepository
    {
        private readonly ApplicationContext _context;

        public MovieHasMovieTagRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<List<MovieHasMovieTag>> GetAll()
        {
            return await _context.MovieHasMovieTags.ToListAsync();
        }

        public async Task<MovieHasMovieTag> Get(int id)
        {
            var entity = await _context.MovieHasMovieTags.FindAsync(id);
            if (entity == null)
            {
                throw new MovieHasMovieTagNotFoundException();
            }

            return entity;
        }

        public async Task<MovieHasMovieTag> Add(MovieHasMovieTag entity)
        {
            await _context.MovieHasMovieTags.AddAsync(entity);
            await _context.SaveChangesAsync();

            if (entity == null)
            {
                throw new InvalidDataException("Movie has movie tag not created");
            }

            return entity;
        }

        public async Task<bool> Update(int id, MovieHasMovieTag entity)
        {
            var movieHasMovieTag = await _context.MovieHasMovieTags.FindAsync(id);
            if (movieHasMovieTag == null)
            {
                throw new MovieHasMovieTagNotFoundException();
            }

            movieHasMovieTag.IdMovie = entity.IdMovie;
            movieHasMovieTag.IdMovieTag = entity.IdMovieTag;

            _context.MovieHasMovieTags.Update(movieHasMovieTag);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(int id)
        {
            var entity = await _context.MovieHasMovieTags.FindAsync(id);
            if (entity == null)
            {
                throw new MovieHasMovieTagNotFoundException();
            }

            _context.MovieHasMovieTags.Remove(entity);

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
