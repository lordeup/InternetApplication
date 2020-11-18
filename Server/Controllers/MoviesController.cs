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
                var viewModels = new HashSet<MovieViewModel>();

                foreach (var entity in entities)
                {
                    var movieTagViewModels = await GetMovieTagViewModelByIdMovie(entity.IdMovie);
                    var movieViewModel = GetMapperMovieToMovieViewModel(entity);
                    movieViewModel.MovieTags = movieTagViewModels;

                    viewModels.Add(movieViewModel);
                }

                return viewModels;
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
                var movieTagViewModels = await GetMovieTagViewModelByIdMovie(id);

                var movieViewModel = GetMapperMovieToMovieViewModel(entity);
                movieViewModel.MovieTags = movieTagViewModels;

                return movieViewModel;
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
                var entity = GetMapperMovieViewModelToMovie(viewModel);
                await _movieRepository.Update(id, entity);

                var movieTags = viewModel.MovieTags.Select(GetMapperMovieTagViewModelToMovieTag).ToList();
                await _movieRepository.UpdateRelationsMovieHasMovieTags(id, movieTags);

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
                var model = await _movieRepository.Add(GetMapperMovieViewModelToMovie(viewModel));

                var movieTags = viewModel.MovieTags.Select(GetMapperMovieTagViewModelToMovieTag).ToList();
                await _movieRepository.AddRelationsMovieHasMovieTags(model.IdMovie, movieTags);
                var movieTagViewModels = await GetMovieTagViewModelByIdMovie(model.IdMovie);

                var movieViewModel = GetMapperMovieToMovieViewModel(model);
                movieViewModel.MovieTags = movieTagViewModels;

                return movieViewModel;
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

        private async Task<ICollection<MovieTagViewModel>> GetMovieTagViewModelByIdMovie(int id)
        {
            var movieTags = await _movieRepository.GetMovieTagsByIdMovie(id);
            return movieTags.Select(GetMapperMovieTagToMovieTagViewModel).ToList();
        }

        private MovieViewModel GetMapperMovieToMovieViewModel(Movie entity)
        {
            return _mapper.Map<MovieViewModel>(entity);
        }

        private Movie GetMapperMovieViewModelToMovie(MovieViewModel viewModel)
        {
            return _mapper.Map<Movie>(viewModel);
        }

        private MovieTagViewModel GetMapperMovieTagToMovieTagViewModel(MovieTag entity)
        {
            return _mapper.Map<MovieTagViewModel>(entity);
        }

        private MovieTag GetMapperMovieTagViewModelToMovieTag(MovieTagViewModel viewModel)
        {
            return _mapper.Map<MovieTag>(viewModel);
        }
    }
}
