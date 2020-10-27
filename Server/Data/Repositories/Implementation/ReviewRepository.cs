using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data.Repositories.Implementation
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly ApplicationContext _context;

        public ReviewRepository(ApplicationContext context)
        {
            _context = context;
        }

        public Task<List<Review>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Review> Get(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Review> Add(Review entity)
        {
            throw new NotImplementedException();
        }

        public Task<Review> Update(Review entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}