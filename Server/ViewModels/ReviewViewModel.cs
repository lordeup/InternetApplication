using System.ComponentModel.DataAnnotations;

namespace Server.ViewModels
{
    public class ReviewViewModel
    {
        public int IdReview { get; set; }

        [Required]
        public int IdUser { get; set; }

        [Required]
        public int IdMovie { get; set; }

        [Required]
        public string Text { get; set; }


        public string Date { get; set; }

        public UserViewModel User { get; set; }
    }
}
