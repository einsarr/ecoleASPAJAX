using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class ProfesseurController : Controller
    {
        private DBEcoleContext db = new DBEcoleContext();
        // GET: Classe
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            return Json(db.professeurs.ToList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Professeur professeur)
        {
            db.professeurs.Add(professeur);
            db.SaveChanges();
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            var Professeur = db.professeurs.Find(ID);
            return Json(Professeur, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Professeur professeur)
        {
            Professeur prof = db.professeurs.Find(professeur.Id);
            prof.Prenom = professeur.Prenom;
            prof.Nom = professeur.Nom;
            prof.Email = professeur.Email;
            prof.Telephone = professeur.Telephone;
            prof.Adresse = professeur.Adresse;
            prof.Cni = professeur.Cni;
            prof.PrixHeure = professeur.PrixHeure;
            db.SaveChanges();
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            Professeur professeur = db.professeurs.Find(ID);
            db.professeurs.Remove(professeur);
            db.SaveChanges();
            return Json(0, JsonRequestBehavior.AllowGet);
        }
    }
}