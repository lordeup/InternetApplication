using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepository;
        private readonly IMapper _mapper;

        public ReviewsController(IReviewRepository reviewRepository, IMapper mapper)
        {
            _reviewRepository = reviewRepository;
            _mapper = mapper;
        }

        // GET: api/Reviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReviewViewModel>>> GetReviews()
        {
            try
            {
                var entities = await _reviewRepository.GetAll();
                return entities.Select(review => _mapper.Map<ReviewViewModel>(review)).ToList();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // GET: api/Reviews/:id
        [HttpGet("{id}")]
        public async Task<ActionResult<ReviewViewModel>> GetReview(int id)
        {
            try
            {
                var entity = await _reviewRepository.Get(id);
                return _mapper.Map<ReviewViewModel>(entity);
            }
            catch (ReviewNotFoundException e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // PATCH: api/Reviews/:id
        [HttpPatch("{id}")]
        [Authorize]
        public async Task<IActionResult> PatchReview(int id, ReviewViewModel viewModel)
        {
            try
            {
                var entity = _mapper.Map<Review>(viewModel);
                await _reviewRepository.Update(id, entity);
                return NoContent();
            }
            catch (ReviewNotFoundException e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // POST: api/Reviews
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ReviewViewModel>> PostReview(ReviewViewModel viewModel)
        {
            try
            {
                var entity = _mapper.Map<Review>(viewModel);
                var model = await _reviewRepository.Add(entity);
                return _mapper.Map<ReviewViewModel>(model);
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

        // DELETE: api/Reviews/:id
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteReview(int id)
        {
            try
            {
                await _reviewRepository.Delete(id);
                return NoContent();
            }
            catch (ReviewNotFoundException e)
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
