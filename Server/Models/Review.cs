using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("review")]
    public class Review
    {
        [Key]
        [Column("id_review")]
        public int IdReview { get; set; }

        [Required]
        [Column("id_user")]
        public int IdUser { get; set; }

        [Required]
        [Column("id_movie")]
        public int IdMovie { get; set; }

        [Column("text")]
        [StringLength(1024)]
        public string Text { get; set; }

        [Column("date")]
        [Timestamp]
        public DateTime Date { get; set; }

        [ForeignKey(nameof(IdUser))]
        public virtual User User { get; set; }

        [ForeignKey(nameof(IdMovie))]
        public virtual Movie Movie { get; set; }
    }
}
