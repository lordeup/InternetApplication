using System.ComponentModel.DataAnnotations;

namespace Server.ViewModels
{
    public class UserViewModel
    {
        public int IdUser { get; set; }

        [Required]
        public int IdUserType { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Login { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string PictureUrl { get; set; }
    }
}
