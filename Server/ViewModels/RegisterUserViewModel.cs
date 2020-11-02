using System.ComponentModel.DataAnnotations;

namespace Server.ViewModels
{
    public class RegisterUserViewModel
    {
        [Required]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }
        
        public string Name { get; set; }

        public string Surname { get; set; }
    }
}