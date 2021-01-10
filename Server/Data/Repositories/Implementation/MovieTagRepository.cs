using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Data.Exceptions;
using Server.Models;

namespace Server.Data.Repositories.Implementation
{
    public class MovieTagRepository : IMovieTagRepository
    {
        private readonly ApplicationContext _context;

        public MovieTagRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<List<MovieTag>> GetAll()
        {
            return await _context.MovieTags.ToListAsync();
        }

        public async Task<MovieTag> Get(int id)
        {
            var entity = await _context.MovieTags.FindAsync(id);
            if (entity == null)
            {
                throw new MovieTagNotFoundException();
            }

            return entity;
        }

        public async Task<MovieTag> Add(MovieTag entity)
        {
            await _context.MovieTags.AddAsync(entity);
            await _context.SaveChangesAsync();

            if (entity == null)
            {
                throw new InvalidDataException("Жанр фильма не создан");
            }

            return entity;
        }

        public async Task<bool> Update(int id, MovieTag entity)
        {
            var movieTag = await _context.MovieTags.FindAsync(id);
            if (movieTag == null)
            {
                throw new MovieTagNotFoundException();
            }

            movieTag.Name = entity.Name;

            _context.MovieTags.Update(movieTag);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(int id)
        {
            var entity = await _context.MovieTags.FindAsync(id);
            if (entity == null)
            {
                throw new MovieTagNotFoundException();
            }

            _context.MovieTags.Remove(entity);

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
