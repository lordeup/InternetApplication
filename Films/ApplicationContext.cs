using Microsoft.EntityFrameworkCore;
using Films.Models;
 
namespace Films
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }
 
        public ApplicationContext()
        {
            Database.EnsureCreated();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("server=localhost;UserId=root;Password=admin;database=films;");
        }
    }
}