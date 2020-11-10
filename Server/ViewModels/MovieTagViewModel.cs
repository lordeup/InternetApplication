using System.ComponentModel.DataAnnotations;

namespace Server.ViewModels
{
    public class MovieTagViewModel
    {
        public int IdMovieTag { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
