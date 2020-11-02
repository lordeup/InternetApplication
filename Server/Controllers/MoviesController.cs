using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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
            var entities = await _movieRepository.GetAll();
            return entities.Select(user => _mapper.Map<MovieViewModel>(user)).ToList();
        }

        // GET: api/Movies/:id
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieViewModel>> GetMovie(int id)
        {
            var entity = await _movieRepository.Get(id);

            if (entity == null)
            {
                return NotFound();
            }

            return _mapper.Map<MovieViewModel>(entity);
        }

        // PATCH: api/Movies/:id
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchMovie(int id, MovieViewModel viewModel)
        {
            var entity = _mapper.Map<Movie>(viewModel);

            try
            {
                if (await _movieRepository.Update(id, entity))
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

        // POST: api/Movies
        [HttpPost]
        public async Task<ActionResult<MovieViewModel>> PostMovie(MovieViewModel viewModel)
        {
            var entity = _mapper.Map<Movie>(viewModel);
            var model = await _movieRepository.Add(entity);

            if (model == null)
            {
                return BadRequest();
            }

            return _mapper.Map<MovieViewModel>(model);
        }

        // DELETE: api/Movies/:id
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMovie(int id)
        {
            try
            {
                if (await _movieRepository.Delete(id))
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