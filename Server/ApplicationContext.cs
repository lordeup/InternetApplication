using Microsoft.EntityFrameworkCore;
using Server.Models;
 
namespace Server
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext()
        {
        }
        public ApplicationContext(DbContextOptions<ApplicationContext> options) 
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Movie> Movies { get; set; }

        public DbSet<MovieRating> MovieRatings { get; set; }

        public DbSet<MovieTag> MovieTags { get; set; }

        public DbSet<Review> Reviews { get; set; }
    }
}