using System.ComponentModel.DataAnnotations;

namespace Server.ViewModels
{
    public class MovieRatingViewModel
    {
        public int IdMovieRating { get; set; }

        [Required]
        public int IdUser { get; set; }

        [Required]
        public int IdMovie { get; set; }

        [Required]
        public float Rating { get; set; }
    }
}
