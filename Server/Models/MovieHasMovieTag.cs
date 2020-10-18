using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("movie_x_movie_tag")]
    public class MovieHasMovieTag 
    {
        [Key]
        [Column("id_movie_x_movie_tag")]
        public int IdMovieXMovieTag { get; set; } 

        [Required]
        [Column("id_movie")]
        public int IdMovie { get; set; } 

        [Required]
        [Column("id_movie_tag")]
        public int IdMovieTag { get; set; }
        
        [ForeignKey(nameof(IdMovie))]
        public virtual Movie Movie { get; set; }

        [ForeignKey(nameof(IdMovieTag))]
        public virtual MovieTag MovieTag { get; set; }
    }
}
