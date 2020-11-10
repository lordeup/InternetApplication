using System;

namespace Server.Data.Exceptions
{
    public class MovieTagNotFoundException : Exception
    {
        public MovieTagNotFoundException()
            : base("Movie tag not found")
        {
        }
    }
}
