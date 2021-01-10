using System;

namespace Server.Data.Exceptions
{
    public class UserExistsException : Exception
    {
        public UserExistsException()
            : base("Это пользователь уже существует")
        {
        }
    }
}
