using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("movie")]
    public class Movie
    {
        [Key]
        [Column("id_movie")]
        public int IdMovie { get; set; }

        [Column("name")]
        [StringLength(255)]
        public string Name { get; set; }
        
        [Column("description")]
        [StringLength(1024)]
        public string Description { get; set; }

        [Column("picture_url")]
        [StringLength(255)]
        public string PictureUrl { get; set; }
    }
}
