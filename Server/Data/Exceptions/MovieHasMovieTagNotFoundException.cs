using System;

namespace Server.Data.Exceptions
{
    public class MovieHasMovieTagNotFoundException : Exception
    {
        public MovieHasMovieTagNotFoundException()
            : base("Movie has movie tag not found")
        {
        }
    }
}
