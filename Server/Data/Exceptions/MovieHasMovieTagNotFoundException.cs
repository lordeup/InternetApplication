using System;

namespace Server.Data.Exceptions
{
    public class MovieHasMovieTagNotFoundException : Exception
    {
        public MovieHasMovieTagNotFoundException()
            : base("Связь между фильмом и жанром фильма не найдена")
        {
        }
    }
}
