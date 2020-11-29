using System.ComponentModel.DataAnnotations;

namespace Server.ViewModels
{
    public class MovieViewModel: CollectionMovieTagViewModel
    {
        public int IdMovie { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public string PictureUrl { get; set; }
    }
}
