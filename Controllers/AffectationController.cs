using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class AffectationController : Controller
    {
        private DBEcoleContext db = new DBEcoleContext();
        // GET: Affectation
        public ActionResult Index()
        {
            ViewBag.ClasseId = new SelectList(db.classes, "Id", "Libelle");
            ViewBag.MatiereId = new SelectList(db.matieres, "Id", "Libelle");
            ViewBag.ProfesseurId = new SelectList(db.professeurs, "Id", "Prenom");
            return View();
        }

        public JsonResult List()
        {
            return Json(db.affectations.ToList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Affectation affectation)
        {
            db.affectations.Add(affectation);
            db.SaveChanges();
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            var affectation = db.affectations.Find(ID);
            return Json(affectation, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Affectation affectation)
        {
            Affectation aff = db.affectations.Find(affectation.Id);
            aff.DateAffectation = affectation.DateAffectation;
            aff.DureeCours = affectation.DureeCours;
            aff.ClasseId = affectation.ClasseId;
            aff.ProfesseurId = affectation.ProfesseurId;
            aff.MatiereId = affectation.MatiereId;
            aff.QuantumHoraire = affectation.QuantumHoraire;
            db.SaveChanges();
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            Affectation a = db.affectations.Find(ID);
            db.affectations.Remove(a);
            db.SaveChanges();
            return Json(0, JsonRequestBehavior.AllowGet);
        }
    }
}