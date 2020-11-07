using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class Professeur
    {
        [Key]
        public int Id { get; set; }
        [Display(Name = "Prénom"), MaxLength(35, ErrorMessage = "La taille maximale est de 35 caractères"), Required(ErrorMessage = "*")]
        public string Prenom { get; set; }
        [Display(Name = "Nom"), MaxLength(35, ErrorMessage = "La taille maximale est de 35 caractères"), Required(ErrorMessage = "*")]
        public string Nom { get; set; }
        [Display(Name = "Email"), Required(ErrorMessage = "*")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Display(Name = "Téléphone"), MaxLength(11, ErrorMessage = "La taille maximale est de 11 caractères"), Required(ErrorMessage = "*")]
        public string Telephone { get; set; }
        [Display(Name = "Adresse"), MaxLength(200, ErrorMessage = "La taille maximale est de 200 caractères"), Required(ErrorMessage = "*")]
        public string Adresse { get; set; }
        [Display(Name = "CNI"), MaxLength(15, ErrorMessage = "La taille maximale est de 18 caractères"), Required(ErrorMessage = "*")]
        public string Cni { get; set; }
        [Display(Name = "Le prix de l'heure"), Required(ErrorMessage = "*")]
        public int PrixHeure { get; set; }
    }
}