using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class Role
    {
        [Key]
        public int IdR { get; set; }
        [Display(Name = "Libellé du role"), MaxLength(35, ErrorMessage = "La taille maximale est de 35 caractères"), Required(ErrorMessage = "*")]
        public string LibelleRole { get; set; }
        [Display(Name = "Etat"), Required(ErrorMessage = "*")]
        public int Etat { get; set; }
    }
}