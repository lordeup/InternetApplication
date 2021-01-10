using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Security.Authentication;
using Server.Data.Exceptions;
using Server.Data.FileManager;
using Server.Models;
using Server.ViewModels;

namespace Server.Data.Repositories.Implementation
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IFileManager _fileManager;

        public UserRepository(ApplicationContext context, IPasswordHasher<User> passwordHasher, IFileManager fileManager)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _fileManager = fileManager;
        }

        public async Task<List<User>> GetAll()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> Get(int id)
        {
            var entity = await _context.Users.FindAsync(id);
            if (entity == null)
            {
                throw new UserNotFoundException();
            }

            return entity;
        }

        public Task<User> Add(User entity)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Update(int id, User entity)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                throw new UserNotFoundException();
            }

            if (!IsEquals(user.Login, entity.Login) && IsUserExists(entity.Login))
            {
                throw new UserExistsException();
            }

            user.IdUserType = entity.IdUserType;
            user.Login = entity.Login;
            user.Password = IsEquals(user.Password, entity.Password)
                ? entity.Password
                : HashPassword(entity, entity.Password);
            user.Name = entity.Name;
            user.Surname = entity.Surname;
            user.PictureUrl = entity.PictureUrl;

            _context.Users.Update(user);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(int id)
        {
            var entity = await _context.Users.FindAsync(id);
            if (entity == null)
            {
                throw new UserNotFoundException();
            }

            if (!string.IsNullOrEmpty(entity.PictureUrl))
            {
                _fileManager.DeleteFile(entity.PictureUrl);
            }

            _context.Users.Remove(entity);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<User> LoginUser(LoginUserViewModel viewModel)
        {
            var entity = await _context.Users.FirstOrDefaultAsync(u => u.Login == viewModel.Login);
            if (entity == null)
            {
                throw new UserNotFoundException();
            }

            var verificationResult = _passwordHasher.VerifyHashedPassword(entity, entity.Password, viewModel.Password);
            if (verificationResult == PasswordVerificationResult.Failed)
            {
                throw new InvalidCredentialException("Неправильный пароль");
            }

            return entity;
        }

        public async Task<User> RegisterUser(RegisterUserViewModel viewModel)
        {
            if (IsUserExists(viewModel.Login))
            {
                throw new UserExistsException();
            }

            var userType = await _context.UserTypes.FirstOrDefaultAsync(e => e.Name == "User");

            var user = new User
            {
                Login = viewModel.Login,
                Name = viewModel.Name,
                Surname = viewModel.Surname,
                IdUserType = userType.IdUserType,
            };
            user.Password = HashPassword(user, viewModel.Password);

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private string HashPassword(User user, string password)
        {
            return _passwordHasher.HashPassword(user, password);
        }

        private bool IsUserExists(string login)
        {
            return _context.Users.Any(e => e.Login == login);
        }

        private static bool IsEquals(string lhs, string rhs)
        {
            return lhs.Equals(rhs);
        }
    }
}
