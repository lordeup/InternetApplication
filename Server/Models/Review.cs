using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Server.Models
{
    [Table("review")]
    public partial class Review
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("id_user")]
        public int IdUser { get; set; }

        [Column("text")]
        [StringLength(1024)]
        public string Text { get; set; }

        [Column("date")]
        [Timestamp]
        public DateTime Date { get; set; }

        [ForeignKey(nameof(IdUser))]
        public virtual User User { get; set; }
    }
}
