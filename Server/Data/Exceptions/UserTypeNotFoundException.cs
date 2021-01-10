using System;

namespace Server.Data.Exceptions
{
    public class UserTypeNotFoundException : Exception
    {
        public UserTypeNotFoundException()
            : base("Тип пользователя не найден")
        {
        }
    }
}
