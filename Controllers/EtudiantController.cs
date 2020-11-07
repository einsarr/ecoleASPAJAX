using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class EtudiantController : Controller
    {
        private DBEcoleContext db = new DBEcoleContext();
        // GET: Classe
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            return Json(db.etudiants.ToList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Etudiant etudiant)
        {
            db.etudiants.Add(etudiant);
            db.SaveChanges();
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            var etudiant = db.etudiants.Find(ID);
            return Json(etudiant, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Etudiant etudiant)
        {
            Etudiant etu = db.etudiants.Find(etudiant.Id);
            etu.Prenom = etudiant.Prenom;
            etu.Nom = etudiant.Nom;
            etu.DateNaissance = etudiant.DateNaissance;
            etu.LieuNaissance = etudiant.LieuNaissance;
            etu.Email = etudiant.Email;
            etu.Telephone = etudiant.Telephone;
            etu.Adresse = etudiant.Adresse;
            etu.Cni = etudiant.Cni;
            db.SaveChanges();
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            Etudiant etudiant = db.etudiants.Find(ID);
            db.etudiants.Remove(etudiant);
            db.SaveChanges();
            return Json(0, JsonRequestBehavior.AllowGet);
        }
    }
}