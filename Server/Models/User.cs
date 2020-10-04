using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Server.Models
{
    [Table("user")]
    public partial class User
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

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
    }
}
