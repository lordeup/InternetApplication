namespace Server.ViewModels
{
    public class UserViewModel
    {
        public int IdUser { get; set; }

        public int IdUserType { get; set; }

        public string Password { get; set; }
        
        public string Login { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string PictureUrl { get; set; }
    }
}