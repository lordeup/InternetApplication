using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // GET: api/Users
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _userRepository.GetAll();
        }

        // GET: api/Users/:id
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _userRepository.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PATCH: api/Users/:id
        [HttpPatch("{id}")]
        [Authorize]
        public async Task<IActionResult> PatchUser(int id, UserViewModel request)
        {
            try
            {
                if (await _userRepository.Update(id, request))
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