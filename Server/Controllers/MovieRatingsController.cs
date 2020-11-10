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
    public class MovieRatingsController : ControllerBase
    {
        private readonly IMovieRatingRepository _movieRatingRepository;
        private readonly IMapper _mapper;

        public MovieRatingsController(IMovieRatingRepository movieRatingRepository, IMapper mapper)
        {
            _movieRatingRepository = movieRatingRepository;
            _mapper = mapper;
        }

        // GET: api/MovieRatings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieRatingViewModel>>> GetMovieRatings()
        {
            try
            {
                var entities = await _movieRatingRepository.GetAll();
                return entities.Select(movieRating => _mapper.Map<MovieRatingViewModel>(movieRating)).ToList();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // GET: api/MovieRatings/:id
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieRatingViewModel>> GetMovieRating(int id)
        {
            try
            {
                var entity = await _movieRatingRepository.Get(id);
                return _mapper.Map<MovieRatingViewModel>(entity);
            }
            catch (MovieRatingNotFoundException e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // GET: api/MovieRatings/user/:id
        [HttpGet("user/{id}")]
        public async Task<ActionResult<IEnumerable<MovieRatingViewModel>>> GetMovieRatingsByIdUser(int id)
        {
            try
            {
                var entities = await _movieRatingRepository.GetMovieRatingsByIdUser(id);
                return entities.Select(movieRating => _mapper.Map<MovieRatingViewModel>(movieRating)).ToList();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // GET: api/MovieRatings/movie/:id
        [HttpGet("movie/{id}")]
        public async Task<ActionResult<IEnumerable<MovieRatingViewModel>>> GetMovieRatingsByIdMovie(int id)
        {
            try
            {
                var entities = await _movieRatingRepository.GetMovieRatingsByIdMovie(id);
                return entities.Select(movieRating => _mapper.Map<MovieRatingViewModel>(movieRating)).ToList();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // GET: api/MovieRatings/rating/:idMovie
        [HttpGet("rating/{idMovie}")]
        public async Task<ActionResult> GetRatingByIdMovie(int idMovie)
        {
            try
            {
                var rating = await _movieRatingRepository.GetRatingByIdMovie(idMovie);
                return Ok(new {Rating = rating});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // PATCH: api/MovieRatings/:id
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchMovieRating(int id, MovieRatingViewModel viewModel)
        {
            try
            {
                var entity = _mapper.Map<MovieRating>(viewModel);
                await _movieRatingRepository.Update(id, entity);
                return NoContent();
            }
            catch (MovieRatingNotFoundException e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // POST: api/MovieRatings
        [HttpPost]
        public async Task<ActionResult<MovieRatingViewModel>> PostMovieRating(MovieRatingViewModel viewModel)
        {
            try
            {
                var entity = _mapper.Map<MovieRating>(viewModel);
                var model = await _movieRatingRepository.Add(entity);
                return _mapper.Map<MovieRatingViewModel>(model);
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

        // DELETE: api/MovieRatings/:id
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMovieRating(int id)
        {
            try
            {
                await _movieRatingRepository.Delete(id);
                return NoContent();
            }
            catch (MovieRatingNotFoundException e)
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
