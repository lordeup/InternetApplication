using System.Collections.Generic;

namespace Server.ViewModels
{
    public class FilterMovieViewModel
    {
        public string Name { get; set; }
        public ICollection<MovieTagViewModel> MovieTags { get; set; } = new HashSet<MovieTagViewModel>();
    }
}
