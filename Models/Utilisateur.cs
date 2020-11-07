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
        public int Id { get; set; }
        [Display(Name = "Prénom"), MaxLength(35, ErrorMessage = "La taille maximale est de 35 caractères"), Required(ErrorMessage = "*")]
        public string Prenom { get; set; }
        [Display(Name = "Nom"), MaxLength(35, ErrorMessage = "La taille maximale est de 35 caractères"), Required(ErrorMessage = "*")]
        public string Nom { get; set; }
        [Display(Name = "Username"), MaxLength(20, ErrorMessage = "La taille maximale est de 20 caractères"), Required(ErrorMessage = "*")]
        public string Username { get; set; }
        [Display(Name = "Mot de passe"), Required(ErrorMessage = "*")]
        public string Password { get; set; }
        [Display(Name = "Email"), Required(ErrorMessage = "*")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Display(Name = "Activé"), Required(ErrorMessage = "*")]
        public int Etat { get; set; }
        public virtual List<Role> Roles { get; set; }
    }
}