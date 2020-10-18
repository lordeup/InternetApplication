using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("user")]
    public class User
    {
        [Key]
        [Column("id_user")]
        public int IdUser { get; set; }
        
        [Required]
        [Column("id_user_type")]
        public int IdUserType { get; set; }

        [Column("name")]
        [StringLength(255)]
        public string Name { get; set; }

        [Column("surname")]
        [StringLength(255)]
        public string Surname { get; set; }

        [Column("login")]
        [StringLength(255)]
        [Required]
        public string Login { get; set; }

        [Column("password")]
        [StringLength(255)]
        [Required]
        public string Password { get; set; }

        [Column("picture_url")]
        [StringLength(255)]
        public string PictureUrl { get; set; }
        
        [ForeignKey(nameof(IdUserType))]
        public virtual UserType UserType { get; set; }
    }
}
