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
    public class MoviesController : ControllerBase
    {
        private readonly IMovieRepository _movieRepository;
        private readonly IMapper _mapper;

        public MoviesController(IMovieRepository movieRepository, IMapper mapper)
        {
            _movieRepository = movieRepository;
            _mapper = mapper;
        }

        // GET: api/Movies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieViewModel>>> GetMovies()
        {
            try
            {
                var entities = await _movieRepository.GetAll();
                return entities.Select(user => _mapper.Map<MovieViewModel>(user)).ToList();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // GET: api/Movies/:id
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieViewModel>> GetMovie(int id)
        {
            try
            {
                var entity = await _movieRepository.Get(id);
                return _mapper.Map<MovieViewModel>(entity);
            }
            catch (MovieNotFoundException e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // PATCH: api/Movies/:id
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchMovie(int id, MovieViewModel viewModel)
        {
            try
            {
                var entity = _mapper.Map<Movie>(viewModel);
                await _movieRepository.Update(id, entity);
                return NoContent();
            }
            catch (MovieNotFoundException e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // POST: api/Movies
        [HttpPost]
        public async Task<ActionResult<MovieViewModel>> PostMovie(MovieViewModel viewModel)
        {
            try
            {
                var entity = _mapper.Map<Movie>(viewModel);
                var model = await _movieRepository.Add(entity);
                return _mapper.Map<MovieViewModel>(model);
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

        // DELETE: api/Movies/:id
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMovie(int id)
        {
            try
            {
                await _movieRepository.Delete(id);
                return NoContent();
            }
            catch (MovieNotFoundException e)
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
