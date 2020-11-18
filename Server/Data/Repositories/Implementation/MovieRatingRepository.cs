using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Data.Exceptions;
using Server.Models;

namespace Server.Data.Repositories.Implementation
{
    public class MovieRatingRepository : IMovieRatingRepository
    {
        private readonly ApplicationContext _context;

        public MovieRatingRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<List<MovieRating>> GetAll()
        {
            return await _context.MovieRatings.ToListAsync();
        }

        public async Task<MovieRating> Get(int id)
        {
            var entity = await _context.MovieRatings.FindAsync(id);
            if (entity == null)
            {
                throw new MovieRatingNotFoundException();
            }

            return entity;
        }

        public async Task<List<MovieRating>> GetMovieRatingsByIdUser(int idUser)
        {
            return await _context.MovieRatings.Where(rating => rating.IdUser == idUser).ToListAsync();
        }

        public async Task<List<MovieRating>> GetMovieRatingsByIdMovie(int idMovie)
        {
            return await _context.MovieRatings.Where(rating => rating.IdMovie == idMovie).ToListAsync();
        }

        public async Task<float> GetRatingByIdMovie(int idMovie)
        {
            var ratingsByIdMovie = await GetMovieRatingsByIdMovie(idMovie);
            return ratingsByIdMovie.DefaultIfEmpty().Average(rating => rating?.Rating ?? 0);
        }

        public async Task<MovieRating> Add(MovieRating entity)
        {
            await _context.MovieRatings.AddAsync(entity);
            await _context.SaveChangesAsync();

            if (entity == null)
            {
                throw new InvalidDataException("Movie rating not created");
            }

            return entity;
        }

        public async Task<bool> Update(int id, MovieRating entity)
        {
            var movieRating = await _context.MovieRatings.FindAsync(id);
            if (movieRating == null)
            {
                throw new MovieRatingNotFoundException();
            }

            movieRating.Rating = entity.Rating;

            _context.MovieRatings.Update(movieRating);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(int id)
        {
            var entity = await _context.MovieRatings.FindAsync(id);
            if (entity == null)
            {
                throw new MovieRatingNotFoundException();
            }

            _context.MovieRatings.Remove(entity);

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
