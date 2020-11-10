using System.ComponentModel.DataAnnotations;

namespace Server.ViewModels
{
    public class UserTypeViewModel
    {
        public int IdUserType { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
