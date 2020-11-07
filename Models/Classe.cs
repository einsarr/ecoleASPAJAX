using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Classe
    {
        [Key]
        public int Id { get; set; }
        [Display(Name = "Libellé de la classe"), MaxLength(35, ErrorMessage = "La taille maximale est de 20 caractères"), Required(ErrorMessage = "*")]
        public string Libelle { get; set; }
        [Display(Name ="Le nombre maximum d'étudiants"),Required(ErrorMessage ="*")]
        [Range(15, 30)]
        public int NombreMax { get; set; }
        [Display(Name = "Activé"), Required(ErrorMessage = "*")]
        public int Etat { get; set; }
    }
}