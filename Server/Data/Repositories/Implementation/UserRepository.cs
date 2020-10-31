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

        public Task<User> Add(UserViewModel viewModel)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Update(int id, UserViewModel viewModel)
        {
            var entity = await _context.Users.FindAsync(id);
            if (entity == null)
            {
                throw new Exception();
            }

            // IsUserExists(viewModel.Login)

            entity.Login = viewModel.Login;
            entity.Password = HashPassword(entity, viewModel.Password);
            entity.Name = viewModel.Name;
            entity.Surname = viewModel.Surname;
            entity.PictureUrl = viewModel.PictureUrl;

            _context.Users.Update(entity);

            return await _context.SaveChangesAsync() > 0;
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
            var entity = await _context.Users.FirstOrDefaultAsync(u => u.Login == viewModel.Login);
            if (entity == null)
            {
                return null;
            }

            var verificationResult = _passwordHasher.VerifyHashedPassword(entity, entity.Password, viewModel.Password);
            return verificationResult == PasswordVerificationResult.Success ? entity : null;
        }

        public async Task<User> RegisterUser(RegisterUserViewModel viewModel)
        {
            if (IsUserExists(viewModel.Login))
            {
                return null;
            }

            // TODO поменять IdUserType на автоматическое определение
            var user = new User
            {
                Login = viewModel.Login,
                Name = viewModel.Name,
                Surname = viewModel.Surname,
                IdUserType = 2,
            };
            user.Password = HashPassword(user, viewModel.Password);

            await _context.Users.AddAsync(user);
            return await _context.SaveChangesAsync() > 0 ? user : null;
        }

        private string HashPassword(User user, string password)
        {
            return _passwordHasher.HashPassword(user, password);
        }

        private bool IsUserExists(string login)
        {
            return _context.Users.Any(e => e.Login == login);
        }
    }
}