using System;

namespace Server.Data.Exceptions
{
    public class MovieRatingNotFoundException : Exception
    {
        public MovieRatingNotFoundException()
            : base("Рейтинг фильма не найден")
        {
        }
    }
}
