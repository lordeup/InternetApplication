using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("movie_rating")]
    public class MovieRating
    {
        [Key]
        [Column("id_movie_rating")]
        public int IdMovieRating { get; set; }
        
        [Key]
        [Column("id_user")]
        public int IdUser { get; set; }

        [Required]
        [Column("id_movie")]
        public int IdMovie { get; set; }

        [Column("rating")]
        public float Rating { get; set; }
        
        [ForeignKey(nameof(IdMovie))]
        public virtual Movie Movie { get; set; }
        
        [ForeignKey(nameof(IdUser))]
        public virtual User User { get; set; }
    }
}
