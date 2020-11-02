using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
            var entities = await _userRepository.GetAll();
            return entities.Select(user => _mapper.Map<UserViewModel>(user)).ToList();
        }

        // GET: api/Users/:id
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<UserViewModel>> GetUser(int id)
        {
            var entity = await _userRepository.Get(id);

            if (entity == null)
            {
                return NotFound();
            }

            return _mapper.Map<UserViewModel>(entity);
        }

        // PATCH: api/Users/:id
        [HttpPatch("{id}")]
        [Authorize]
        public async Task<IActionResult> PatchUser(int id, UserViewModel viewModel)
        {
            var entity = _mapper.Map<User>(viewModel);

            try
            {
                if (await _userRepository.Update(id, entity))
                {
                    return NoContent();
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }

            return BadRequest();
        }

        // DELETE: api/Users/:id
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteUser(int id)
        {
            try
            {
                if (await _userRepository.Delete(id))
                {
                    return NoContent();
                }
            }
            catch (Exception)
            {
                return NotFound();
            }

            return BadRequest();
        }
    }
}