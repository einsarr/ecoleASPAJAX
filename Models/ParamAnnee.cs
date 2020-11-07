using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class ParamAnnee
    {
        [Key]
        public int Id { get; set; }
        [Display(Name = "Code années"), Required(ErrorMessage = "*")]
        public string CodeAnnee { get; set; }
        [Display(Name ="Libellé année"),Required(ErrorMessage ="*")]
        public string LibelleAnnee { get; set; }
        [Display(Name = "Etat"), Required(ErrorMessage = "*")]
        public int Etat { get; set; }
    }
}