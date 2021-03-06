using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("movie_tag")]
    public class MovieTag
    {
        [Key]
        [Column("id_movie_tag")]
        public int IdMovieTag { get; set; }

        [Column("name")]
        [StringLength(255)]
        public string Name { get; set; }
    }
}
