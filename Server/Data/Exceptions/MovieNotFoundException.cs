using System;

namespace Server.Data.Exceptions
{
    public class MovieNotFoundException : Exception
    {
        public MovieNotFoundException()
            : base("Фильм не найден")
        {
        }
    }
}
