using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class Affectation
    {
        [Key]
        public int Id { get; set; }
        [Display(Name = "Date d'affectation"), Required(ErrorMessage = "*")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? DateAffectation { get; set; }
        [Display(Name = "Durée du cours"), Required(ErrorMessage = "*")]
        public int DureeCours { get; set; }
        [Display(Name = "Classe")]
        public int ClasseId { get; set; }
        public virtual Classe Classe { get; set; }
        [Display(Name = "Professeur")]
        public int ProfesseurId { get; set; }
        public virtual Professeur Professeur { get; set; }
        [Display(Name = "Matiere")]
        public int MatiereId { get; set; }
        public virtual Matiere Matiere { get; set; }
        [Display(Name = "Quantum horaire")]
        public int QuantumHoraire { get; set; }
    }
}