using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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

        public Task<List<MovieTag>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<MovieTag> Get(int id)
        {
            throw new NotImplementedException();
        }

        public Task<MovieTag> Add(MovieTag entity)
        {
            throw new NotImplementedException();
        }

        public Task<MovieTag> Update(MovieTag entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}