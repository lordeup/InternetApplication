using System;

namespace Server.Data.Exceptions
{
    public class UserTypeNotFoundException : Exception
    {
        public UserTypeNotFoundException()
            : base("User type not found")
        {
        }
    }
}
