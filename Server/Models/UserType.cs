using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("user_type")]
    public class UserType
    {
        [Key]
        [Column("id_user_type")]
        public int IdUserType { get; set; }

        [Column("name")]
        [StringLength(100)]
        public string Name { get; set; }
    }
}
