using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Auth;
using Server.Data.Repositories;
using Server.ViewModels;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly TokenGenerator _tokenGenerator;

        public AuthController(IUserRepository userRepository, TokenGenerator tokenGenerator)
        {
            _userRepository = userRepository;
            _tokenGenerator = tokenGenerator;
        }

        [Route("login")]
        [HttpPost]
        public async Task<ActionResult<AuthAccessViewModel>> Login(LoginUserViewModel request)
        {
            var user = await _userRepository.LoginUser(request);
            if (user == null)
            {
                return BadRequest();
            }

            var token = _tokenGenerator.GenerateJwt(user);

            return new AuthAccessViewModel
            {
                AccessToken = token,
                IdUser = user.IdUser,
            };
        }

        [Route("register")]
        [HttpPost]
        public async Task<ActionResult<AuthAccessViewModel>> Register(RegisterUserViewModel request)
        {
            var user = await _userRepository.RegisterUser(request);
            if (user == null)
            {
                return BadRequest();
            }

            var token = _tokenGenerator.GenerateJwt(user);

            return new AuthAccessViewModel
            {
                AccessToken = token,
                IdUser = user.IdUser,
            };
        }
    }
}