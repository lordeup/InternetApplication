using System;

namespace Server.Data.Exceptions
{
    public class UserNotFoundException : Exception
    {
        public UserNotFoundException()
            : base("Пользователь не найден")
        {
        }
    }
}
