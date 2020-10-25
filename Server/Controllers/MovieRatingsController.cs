using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieRatingsController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public MovieRatingsController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/MovieRatings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieRating>>> GetMovieRatings()
        {
            return await _context.MovieRatings.ToListAsync();
        }

        // GET: api/MovieRatings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieRating>> GetMovieRating(int id)
        {
            var movieRating = await _context.MovieRatings.FindAsync(id);

            if (movieRating == null)
            {
                return NotFound();
            }

            return movieRating;
        }

        // PUT: api/MovieRatings/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovieRating(int id, MovieRating movieRating)
        {
            if (id != movieRating.IdMovie)
            {
                return BadRequest();
            }

            _context.Entry(movieRating).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieRatingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MovieRatings
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<MovieRating>> PostMovieRating(MovieRating movieRating)
        {
            _context.MovieRatings.Add(movieRating);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MovieRatingExists(movieRating.IdMovie))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetMovieRating", new { id = movieRating.IdMovie }, movieRating);
        }

        // DELETE: api/MovieRatings/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MovieRating>> DeleteMovieRating(int id)
        {
            var movieRating = await _context.MovieRatings.FindAsync(id);
            if (movieRating == null)
            {
                return NotFound();
            }

            _context.MovieRatings.Remove(movieRating);
            await _context.SaveChangesAsync();

            return movieRating;
        }

        private bool MovieRatingExists(int id)
        {
            return _context.MovieRatings.Any(e => e.IdMovie == id);
        }
    }
}
