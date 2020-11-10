using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class Utilisateur
    {
        [Key]
        public int IdU { get; set; }
        [Display(Name = "Prénom"), MaxLength(35, ErrorMessage = "La taille maximale est de 35 caractères"), Required(ErrorMessage = "*")]
        public string Prenom { get; set; }
        [Display(Name = "Nom"), MaxLength(35, ErrorMessage = "La taille maximale est de 35 caractères"), Required(ErrorMessage = "*")]
        public string Nom { get; set; }
        [Display(Name = "Identifiant"), MaxLength(35, ErrorMessage = "La taille maximale est de 35 caractères"), Required(ErrorMessage = "*")]
        public string Identifiant { get; set; }
        [Display(Name = "Email"), MaxLength(30, ErrorMessage = "La taille maximale est de 30 caractères"), Required(ErrorMessage = "*")]
        public string EmailU { get; set; }
        [Display(Name = "Téléphone"), MaxLength(20, ErrorMessage = "La taille maximale est de 20 caractères"), Required(ErrorMessage = "*")]
        public string TelephoneU { get; set; }
        [Display(Name = "User"), MaxLength(80, ErrorMessage = "La taille maximale est de 30")]
        public string IdUser { get; set; }
        [Display(Name = "Etat"), Required(ErrorMessage = "*")]
        public int Etat { get; set; }
        
    }
}