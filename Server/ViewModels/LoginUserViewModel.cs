using System.ComponentModel.DataAnnotations;

namespace Server.ViewModels
{
    public class LoginUserViewModel
    {
        [Required]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }
    }
}