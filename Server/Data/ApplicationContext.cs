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
            modelBuilder.Entity<MovieRating>().HasKey(e => new { e.IdMovie, e.IdUser });
            modelBuilder.Entity<MovieHasMovieTag>().HasKey(e => new { e.IdMovie, e.IdMovieTag });
            modelBuilder.Entity<Review>().HasKey(e => new { e.IdMovie, e.IdUser });
            modelBuilder.Entity<User>().HasKey(e => new { e.IdUserType });
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