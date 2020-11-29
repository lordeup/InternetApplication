using System.Collections.Generic;

namespace Server.ViewModels
{
    public class CollectionMovieTagViewModel
    {
        public ICollection<MovieTagViewModel> MovieTags { get; set; } = new HashSet<MovieTagViewModel>();
    }
}
