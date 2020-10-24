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
    public class MovieTagsController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public MovieTagsController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/MovieTags
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieTag>>> GetMovieTags()
        {
            return await _context.MovieTags.ToListAsync();
        }

        // GET: api/MovieTags/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieTag>> GetMovieTag(int id)
        {
            var movieTag = await _context.MovieTags.FindAsync(id);

            if (movieTag == null)
            {
                return NotFound();
            }

            return movieTag;
        }

        // PUT: api/MovieTags/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovieTag(int id, MovieTag movieTag)
        {
            if (id != movieTag.IdMovieTag)
            {
                return BadRequest();
            }

            _context.Entry(movieTag).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieTagExists(id))
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

        // POST: api/MovieTags
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<MovieTag>> PostMovieTag(MovieTag movieTag)
        {
            _context.MovieTags.Add(movieTag);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMovieTag", new { id = movieTag.IdMovieTag }, movieTag);
        }

        // DELETE: api/MovieTags/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MovieTag>> DeleteMovieTag(int id)
        {
            var movieTag = await _context.MovieTags.FindAsync(id);
            if (movieTag == null)
            {
                return NotFound();
            }

            _context.MovieTags.Remove(movieTag);
            await _context.SaveChangesAsync();

            return movieTag;
        }

        private bool MovieTagExists(int id)
        {
            return _context.MovieTags.Any(e => e.IdMovieTag == id);
        }
    }
}
