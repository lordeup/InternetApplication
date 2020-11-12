using System.ComponentModel.DataAnnotations;

namespace Server.ViewModels
{
    public class MovieHasMovieTagViewModel
    {
        public int IdMovieXMovieTag { get; set; }

        [Required]
        public int IdMovie { get; set; }

        [Required]
        public int IdMovieTag { get; set; }
    }
}
