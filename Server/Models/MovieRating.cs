using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Server.Models
{
    [Table("movie_rating")]
    public partial class MovieRating
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("rating")]
        public float Rating { get; set; }
    }
}
