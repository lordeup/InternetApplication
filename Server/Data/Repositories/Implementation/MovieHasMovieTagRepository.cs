using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper.Internal;
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

        private async Task<List<int>> GetIdsMovieByIdMovieTag(int idMovieTag)
        {
            return await _context.MovieHasMovieTags
                .Where(value => value.IdMovieTag == idMovieTag)
                .Select(o => o.IdMovie)
                .ToListAsync();
        }

        public async Task<List<Movie>> FindMoviesByMovieTags(IEnumerable<MovieTag> movieTags)
        {
            var idSet = new HashSet<int>();
            var movies = new HashSet<Movie>();

            foreach (var movieTag in movieTags)
            {
                var idsMovieByIdMovieTag = await GetIdsMovieByIdMovieTag(movieTag.IdMovieTag);
                idsMovieByIdMovieTag.ForEach(value => idSet.Add(value));
            }

            foreach (var id in idSet)
            {
                var entity = await _context.Movies.FindAsync(id);
                movies.Add(entity);
            }

            return movies.ToList();
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
