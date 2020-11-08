using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Ecole
    {
        [Key]
        public int Id { get; set; }
        [Display(Name = "Nom"), MaxLength(35, ErrorMessage = "La taille maximale est de 20 caractères"), Required(ErrorMessage = "*")]
        public string Nom { get; set; }
        [Display(Name = "Description"), MaxLength(255, ErrorMessage = "La taille maximale est de 20 caractères"), Required(ErrorMessage = "*")]
        public string Description { get; set; }
        [Display(Name ="Adresse"),Required(ErrorMessage ="*")]
        public string Adresse { get; set; }
        [Display(Name = "Standard"), Required(ErrorMessage = "*")]
        public string TelephoneFix { get; set; }
        [Display(Name = "Téléphone portable"), Required(ErrorMessage = "*")]
        public string TelephoneP { get; set; }
        [Display(Name = "Fax"), Required(ErrorMessage = "*")]
        public string Fax { get; set; }
        [Display(Name = "Email"), Required(ErrorMessage = "*")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Display(Name = "Ninéa"), Required(ErrorMessage = "*")]
        public string Ninea { get; set; }
        [Display(Name = "Date de création"), Required(ErrorMessage = "*")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? DateCreation { get; set; }
        [Display(Name = "Etat"), Required(ErrorMessage = "*")]
        public int Etat { get; set; }
    }
}