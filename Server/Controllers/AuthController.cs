using System;
using System.Security.Authentication;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Auth;
using Server.Data.Exceptions;
using Server.Data.Repositories;
using Server.ViewModels;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserTypeRepository _userTypeRepository;
        private readonly TokenGenerator _tokenGenerator;

        public AuthController(IUserRepository userRepository, IUserTypeRepository userTypeRepository,
            TokenGenerator tokenGenerator)
        {
            _userRepository = userRepository;
            _userTypeRepository = userTypeRepository;
            _tokenGenerator = tokenGenerator;
        }

        // POST: api/Auth/login
        [Route("login")]
        [HttpPost]
        public async Task<ActionResult<AuthAccessViewModel>> Login(LoginUserViewModel viewModel)
        {
            try
            {
                var user = await _userRepository.LoginUser(viewModel);
                var userType = await _userTypeRepository.Get(user.IdUserType);
                var token = _tokenGenerator.GenerateToken(user, userType.Name);

                return new AuthAccessViewModel
                {
                    AccessToken = token,
                    IdUser = user.IdUser,
                };
            }
            catch (UserNotFoundException e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (UserTypeNotFoundException e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (InvalidCredentialException e)
            {
                return Unauthorized(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // POST: api/Auth/register
        [Route("register")]
        [HttpPost]
        public async Task<ActionResult<AuthAccessViewModel>> Register(RegisterUserViewModel viewModel)
        {
            try
            {
                var user = await _userRepository.RegisterUser(viewModel);
                var userType = await _userTypeRepository.Get(user.IdUserType);
                var token = _tokenGenerator.GenerateToken(user, userType.Name);

                return new AuthAccessViewModel
                {
                    AccessToken = token,
                    IdUser = user.IdUser,
                };
            }
            catch (UserExistsException e)
            {
                return BadRequest(new {message = e.Message});
            }
            catch (UserTypeNotFoundException e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }
    }
}
