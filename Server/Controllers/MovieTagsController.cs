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
    public class MovieTagsController : ControllerBase
    {
        private readonly IMovieTagRepository _movieTagRepository;
        private readonly IMapper _mapper;

        public MovieTagsController(IMovieTagRepository movieTagRepository, IMapper mapper)
        {
            _movieTagRepository = movieTagRepository;
            _mapper = mapper;
        }

        // GET: api/MovieTags
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieTagViewModel>>> GetMovieTags()
        {
            try
            {
                var entities = await _movieTagRepository.GetAll();
                return entities.Select(movieTag => _mapper.Map<MovieTagViewModel>(movieTag)).ToList();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // GET: api/MovieTags/:id
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieTagViewModel>> GetMovieTag(int id)
        {
            try
            {
                var entity = await _movieTagRepository.Get(id);
                return _mapper.Map<MovieTagViewModel>(entity);
            }
            catch (MovieTagNotFoundException e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // PATCH: api/MovieTags/:id
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchMovieTag(int id, MovieTagViewModel viewModel)
        {
            try
            {
                var entity = _mapper.Map<MovieTag>(viewModel);
                await _movieTagRepository.Update(id, entity);
                return NoContent();
            }
            catch (MovieTagNotFoundException e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // POST: api/MovieTags
        [HttpPost]
        public async Task<ActionResult<MovieTagViewModel>> PostMovieTag(MovieTagViewModel viewModel)
        {
            try
            {
                var entity = _mapper.Map<MovieTag>(viewModel);
                var model = await _movieTagRepository.Add(entity);
                return _mapper.Map<MovieTagViewModel>(model);
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

        // DELETE: api/MovieTags/:id
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMovieTag(int id)
        {
            try
            {
                await _movieTagRepository.Delete(id);
                return NoContent();
            }
            catch (MovieTagNotFoundException e)
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
