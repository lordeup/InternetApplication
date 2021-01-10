using System;

namespace Server.Data.Exceptions
{
    public class MovieTagNotFoundException : Exception
    {
        public MovieTagNotFoundException()
            : base("Жанр фильма не найден")
        {
        }
    }
}
