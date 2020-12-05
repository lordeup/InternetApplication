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
        private readonly IMovieHasMovieTagRepository _movieHasMovieTagRepository;
        private readonly IMapper _mapper;

        public MoviesController(IMovieRepository movieRepository,
            IMovieHasMovieTagRepository movieHasMovieTagRepository, IMapper mapper)
        {
            _movieRepository = movieRepository;
            _movieHasMovieTagRepository = movieHasMovieTagRepository;
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
                    var movieViewModel = await GetMovieViewModels(entity);
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
                var movieViewModel = await GetMovieViewModels(entity);

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

        // POST: api/Movies/filterMovie
        [Route("filterMovie")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<MovieViewModel>>> FilterMovie(FilterMovieViewModel viewModel)
        {
            var moviesByMovieTags = new List<Movie>();
            var moviesFilter = new List<Movie>();

            var hasMovieTags = viewModel.MovieTags.Count > 0;

            try
            {
                if (hasMovieTags)
                {
                    var movieTags = viewModel.MovieTags.Select(GetMapperMovieTagViewModelToMovieTag).ToList();
                    moviesByMovieTags = await _movieHasMovieTagRepository.FindMoviesByMovieTags(movieTags);
                    moviesFilter = moviesByMovieTags;
                }

                if (!string.IsNullOrEmpty(viewModel.Name))
                {
                    var moviesByMovieName = _movieRepository.FindMoviesByMovieName(viewModel.Name);
                    moviesFilter = hasMovieTags
                        ? moviesByMovieName.Intersect(moviesByMovieTags).ToList()
                        : moviesByMovieName;
                }

                var viewModels = new HashSet<MovieViewModel>();

                foreach (var entity in moviesFilter)
                {
                    var movieViewModel = await GetMovieViewModels(entity);
                    viewModels.Add(movieViewModel);
                }

                return viewModels;
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
                await _movieHasMovieTagRepository.UpdateRelationsMovieHasMovieTags(id, movieTags);

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
                await _movieHasMovieTagRepository.AddRelationsMovieHasMovieTags(model.IdMovie, movieTags);
                var movieViewModel = await GetMovieViewModels(model);

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

        private async Task<MovieViewModel> GetMovieViewModels(Movie entity)
        {
            var movieTags = await _movieHasMovieTagRepository.GetMovieTagsByIdMovie(entity.IdMovie);
            var movieTagViewModels = movieTags.Select(GetMapperMovieTagToMovieTagViewModel).ToList();

            var movieViewModel = GetMapperMovieToMovieViewModel(entity);
            movieViewModel.MovieTags = movieTagViewModels;

            return movieViewModel;
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
