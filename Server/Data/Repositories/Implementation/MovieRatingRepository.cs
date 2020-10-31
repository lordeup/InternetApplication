using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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

        public Task<List<MovieRating>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<MovieRating> Get(int id)
        {
            throw new NotImplementedException();
        }

        public Task<MovieRating> Add(MovieRating entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(int id, MovieRating entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}