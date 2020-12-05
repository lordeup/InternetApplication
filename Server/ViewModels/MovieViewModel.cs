using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Server.ViewModels
{
    public class MovieViewModel
    {
        public int IdMovie { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public string PictureUrl { get; set; }

        public ICollection<MovieTagViewModel> MovieTags { get; set; } = new HashSet<MovieTagViewModel>();
    }
}
