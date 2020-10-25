using Microsoft.EntityFrameworkCore;
using Server.Models;
 
namespace Server.Data
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
        }
        
        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            base.OnConfiguring(builder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MovieRating>().HasKey(e => new { e.IdMovieRating });
            modelBuilder.Entity<MovieHasMovieTag>().HasKey(e => new { e.IdMovieXMovieTag });
            modelBuilder.Entity<Review>().HasKey(e => new { e.IdReview });
            modelBuilder.Entity<User>().HasKey(e => new { e.IdUser });
        }

        public DbSet<UserType> UserTypes { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Movie> Movies { get; set; }

        public DbSet<MovieTag> MovieTags { get; set; }

        public DbSet<MovieHasMovieTag> MovieHasMovieTags { get; set; }

        public DbSet<MovieRating> MovieRatings { get; set; }
        public DbSet<Review> Reviews { get; set; }
    }
}