using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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
    public class UserTypesController : ControllerBase
    {
        private readonly IUserTypeRepository _userTypeRepository;
        private readonly IMapper _mapper;

        public UserTypesController(IUserTypeRepository userTypeRepository, IMapper mapper)
        {
            _userTypeRepository = userTypeRepository;
            _mapper = mapper;
        }

        // GET: api/UserTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserTypeViewModel>>> GetUserTypes()
        {
            try
            {
                var entities = await _userTypeRepository.GetAll();
                return entities.Select(userType => _mapper.Map<UserTypeViewModel>(userType)).ToList();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // GET: api/UserTypes/:id
        [HttpGet("{id}")]
        public async Task<ActionResult<UserTypeViewModel>> GetUserType(int id)
        {
            try
            {
                var entity = await _userTypeRepository.Get(id);
                return _mapper.Map<UserTypeViewModel>(entity);
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

        // PATCH: api/UserTypes/:id
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchUserType(int id, UserTypeViewModel viewModel)
        {
            try
            {
                var entity = _mapper.Map<UserType>(viewModel);
                await _userTypeRepository.Update(id, entity);
                return NoContent();
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

        // POST: api/UserTypes
        [HttpPost]
        public async Task<ActionResult<UserTypeViewModel>> PostUserType(UserTypeViewModel viewModel)
        {
            try
            {
                var entity = _mapper.Map<UserType>(viewModel);
                var model = await _userTypeRepository.Add(entity);
                return _mapper.Map<UserTypeViewModel>(model);
            }
            catch (InvalidDataException e)
            {
                return BadRequest(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // DELETE: api/UserTypes/:id
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUserType(int id)
        {
            try
            {
                await _userTypeRepository.Delete(id);
                return NoContent();
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
