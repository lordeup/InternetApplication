using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Data.Exceptions;
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

        public async Task<List<Review>> GetAll()
        {
            return await _context.Reviews.ToListAsync();
        }

        public async Task<Review> Get(int id)
        {
            var entity = await _context.Reviews.FindAsync(id);
            if (entity == null)
            {
                throw new ReviewNotFoundException();
            }

            return entity;
        }

        public async Task<Review> Add(Review entity)
        {
            await _context.Reviews.AddAsync(entity);
            await _context.SaveChangesAsync();

            if (entity == null)
            {
                throw new InvalidDataException("Review not created");
            }

            return entity;
        }

        public async Task<bool> Update(int id, Review entity)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                throw new ReviewNotFoundException();
            }

            review.Text = entity.Text;

            _context.Reviews.Update(review);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(int id)
        {
            var entity = await _context.Reviews.FindAsync(id);
            if (entity == null)
            {
                throw new ReviewNotFoundException();
            }

            _context.Reviews.Remove(entity);

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
