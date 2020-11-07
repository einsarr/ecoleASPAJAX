using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class Etudiant
    {
        [Key]
        public int Id { get; set; }
        [Display(Name = "Prénom"), MaxLength(35, ErrorMessage = "La taille maximale est de 35 caractères"), Required(ErrorMessage = "*")]
        public string Prenom { get; set; }
        [Display(Name = "Nom"), MaxLength(35, ErrorMessage = "La taille maximale est de 35 caractères"), Required(ErrorMessage = "*")]
        public string Nom { get; set; }
        [Display(Name = "Date de naissance"), Required(ErrorMessage = "*")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? DateNaissance { get; set; }
        [Display(Name = "Lieu de naissance"),Required(ErrorMessage = "*")]
        public string LieuNaissance { get; set; }
        [Display(Name = "Email"), Required(ErrorMessage = "*")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Display(Name = "Téléphone"), MaxLength(11, ErrorMessage = "La taille maximale est de 11 caractères"), Required(ErrorMessage = "*")]
        public string Telephone { get; set; }
        [Display(Name = "Adresse"), MaxLength(200, ErrorMessage = "La taille maximale est de 200 caractères"), Required(ErrorMessage = "*")]
        public string Adresse { get; set; }
        [Display(Name = "CNI"), MaxLength(18, ErrorMessage = "La taille maximale est de 18 caractères"), Required(ErrorMessage = "*")]
        public string Cni { get; set; }

    }
}