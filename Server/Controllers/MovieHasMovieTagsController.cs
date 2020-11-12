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
    public class MovieHasMovieTagsController : ControllerBase
    {
        private readonly IMovieHasMovieTagRepository _movieHasMovieTagRepository;
        private readonly IMapper _mapper;

        public MovieHasMovieTagsController(IMovieHasMovieTagRepository movieHasMovieTagRepository, IMapper mapper)
        {
            _movieHasMovieTagRepository = movieHasMovieTagRepository;
            _mapper = mapper;
        }

        // GET: api/MovieHasMovieTags
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieHasMovieTagViewModel>>> GetMovieHasMovieTags()
        {
            try
            {
                var entities = await _movieHasMovieTagRepository.GetAll();
                return entities.Select(tag => _mapper.Map<MovieHasMovieTagViewModel>(tag)).ToList();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // GET: api/MovieHasMovieTags/:id
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieHasMovieTagViewModel>> GetMovieHasMovieTag(int id)
        {
            try
            {
                var entity = await _movieHasMovieTagRepository.Get(id);
                return _mapper.Map<MovieHasMovieTagViewModel>(entity);
            }
            catch (MovieHasMovieTagNotFoundException e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // PATCH: api/MovieHasMovieTags/:id
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchMovieHasMovieTag(int id, MovieHasMovieTagViewModel viewModel)
        {
            try
            {
                var entity = _mapper.Map<MovieHasMovieTag>(viewModel);
                await _movieHasMovieTagRepository.Update(id, entity);
                return NoContent();
            }
            catch (MovieHasMovieTagNotFoundException e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // POST: api/MovieHasMovieTags
        [HttpPost]
        public async Task<ActionResult<MovieHasMovieTagViewModel>> PostMovieHasMovieTag(
            MovieHasMovieTagViewModel viewModel)
        {
            try
            {
                var entity = _mapper.Map<MovieHasMovieTag>(viewModel);
                var model = await _movieHasMovieTagRepository.Add(entity);
                return _mapper.Map<MovieHasMovieTagViewModel>(model);
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

        // DELETE: api/MovieHasMovieTags/:id
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMovieHasMovieTag(int id)
        {
            try
            {
                await _movieHasMovieTagRepository.Delete(id);
                return NoContent();
            }
            catch (MovieHasMovieTagNotFoundException e)
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
