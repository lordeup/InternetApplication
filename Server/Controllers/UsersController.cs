using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Data.Exceptions;
using Server.Data.Repositories;
using Server.Models;
using Server.ViewModels;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        // GET: api/Users
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<UserViewModel>>> GetUsers()
        {
            try
            {
                var entities = await _userRepository.GetAll();
                return entities.Select(user => _mapper.Map<UserViewModel>(user)).ToList();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // GET: api/Users/:id
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<UserViewModel>> GetUser(int id)
        {
            try
            {
                var entity = await _userRepository.Get(id);
                return _mapper.Map<UserViewModel>(entity);
            }
            catch (UserNotFoundException e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // PATCH: api/Users/:id
        [HttpPatch("{id}")]
        [Authorize]
        public async Task<IActionResult> PatchUser(int id, UserViewModel viewModel)
        {
            try
            {
                var entity = _mapper.Map<User>(viewModel);
                await _userRepository.Update(id, entity);
                return NoContent();
            }
            catch (UserNotFoundException e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (UserExistsException e)
            {
                return BadRequest(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // DELETE: api/Users/:id
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteUser(int id)
        {
            try
            {
                await _userRepository.Delete(id);
                return NoContent();
            }
            catch (UserNotFoundException e)
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
