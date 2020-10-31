using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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

        public Task<List<Movie>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Movie> Get(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Movie> Add(Movie entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(int id, Movie entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}