using System.Collections.Generic;
using System.IO;
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
    }
}
