using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using Server.Models;
using Server.ViewModels;

namespace Server.Data.Repositories.Implementation
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;

        public UserRepository(ApplicationContext context, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        public async Task<List<User>> GetAll()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> Get(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public Task<User> Add(User entity)
        {
            throw new NotImplementedException();
        }

        public Task<User> Update(User entity)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Delete(int id)
        {
            var entity = await _context.Users.FindAsync(id);
            if (entity == null)
            {
                throw new Exception();
            }

            _context.Users.Remove(entity);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<User> LoginUser(LoginUserViewModel viewModel)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Login == viewModel.Login);
            if (user == null)
            {
                return null;
            }
            
            var verificationResult = _passwordHasher.VerifyHashedPassword(user, user.Password, viewModel.Password);
            return verificationResult == PasswordVerificationResult.Success ? user : null;
        }

        public async Task<User> RegisterUser(RegisterUserViewModel viewModel)
        {
            if (_context.Users.Any(item => item.Login == viewModel.Login))
            {
                return null;
            }
            
            // TODO поменять IdUserType на автоматическое определение
            var user = new User
            {
                Login = viewModel.Login,
                Name = viewModel.Name,
                Surname = viewModel.Surname,
                IdUserType = 1,
            };
            user.Password = _passwordHasher.HashPassword(user, viewModel.Password);
            
            await _context.Users.AddAsync(user);
            return await _context.SaveChangesAsync() > 0 ? user : null;
        }
    }
}