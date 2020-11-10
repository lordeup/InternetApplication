using System;

namespace Server.Data.Exceptions
{
    public class ReviewNotFoundException : Exception
    {
        public ReviewNotFoundException()
            : base("Review not found")
        {
        }
    }
}
