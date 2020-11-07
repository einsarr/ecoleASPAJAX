using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class Matiere
    {
        [Key]
        public int Id { get; set; }
        [Display(Name = "Libellé de la matiere"), MaxLength(35, ErrorMessage = "La taille maximale est de 20 caractères"), Required(ErrorMessage = "*")]
        public string Libelle { get; set; }
        [Display(Name = "Le coeficiant"), Required(ErrorMessage = "*")]
        public int Coefficient { get; set; }
        [Display(Name = "Activé"), Required(ErrorMessage = "*")]
        public int Etat { get; set; }
    }
}