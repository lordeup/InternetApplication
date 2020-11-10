using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Data.Exceptions;
using Server.Models;

namespace Server.Data.Repositories.Implementation
{
    public class UserTypeRepository : IUserTypeRepository
    {
        private readonly ApplicationContext _context;

        public UserTypeRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<List<UserType>> GetAll()
        {
            return await _context.UserTypes.ToListAsync();
        }

        public async Task<UserType> Get(int id)
        {
            var entity = await _context.UserTypes.FindAsync(id);
            if (entity == null)
            {
                throw new UserTypeNotFoundException();
            }

            return entity;
        }

        public async Task<UserType> Add(UserType entity)
        {
            await _context.UserTypes.AddAsync(entity);
            await _context.SaveChangesAsync();

            if (entity == null)
            {
                throw new InvalidDataException("User type not created");
            }

            return entity;
        }

        public async Task<bool> Update(int id, UserType entity)
        {
            var userType = await _context.UserTypes.FindAsync(id);
            if (userType == null)
            {
                throw new UserTypeNotFoundException();
            }

            userType.Name = entity.Name;

            _context.UserTypes.Update(userType);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(int id)
        {
            var entity = await _context.UserTypes.FindAsync(id);
            if (entity == null)
            {
                throw new UserTypeNotFoundException();
            }

            _context.UserTypes.Remove(entity);

            return await _context.SaveChangesAsync() > 0;
        }
    }
}
