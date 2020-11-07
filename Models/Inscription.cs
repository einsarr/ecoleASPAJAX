using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;


namespace WebApplication1.Models
{
    public class Inscription
    {
        [Key]
        public int Id { get; set; }
        [Display(Name = "Libellé de la inscription"), MaxLength(35, ErrorMessage = "La taille maximale est de 20 caractères"), Required(ErrorMessage = "*")]
        public string Libelle { get; set; }
        [Display(Name = "L'étudiants"), Required(ErrorMessage = "*")]
        public int EtudiantId { get; set; }
        public virtual Etudiant Etudiant { get; set; }
        [Display(Name = "Classe"), Required(ErrorMessage = "*")]
        public int ClasseId { get; set; }
        public virtual Classe Classe { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? DateInscription { get; set; }
        [Display(Name = "Montant inscription"), Required(ErrorMessage = "*")]
        public float Montant { get; set; }

    }
}