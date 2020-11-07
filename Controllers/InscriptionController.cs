using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class InscriptionController : Controller
    {
        private DBEcoleContext db = new DBEcoleContext();
        // GET: Inscription
        public ActionResult Index()
        {
            ViewBag.ClasseId = new SelectList(db.classes, "Id", "Libelle");
            ViewBag.EtudiantId = new SelectList(db.etudiants, "Id", "Prenom");
            return View();
        }

        public JsonResult List()
        {
            return Json(db.inscriptions.ToList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Inscription inscription)
        {
            db.inscriptions.Add(inscription);
            db.SaveChanges();
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            var inscription = db.inscriptions.Find(ID);
            return Json(inscription, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Inscription inscription)
        {
            Inscription insc = db.inscriptions.Find(inscription.Id);
            insc.Libelle = inscription.Libelle;
            insc.EtudiantId = inscription.EtudiantId;
            insc.ClasseId = inscription.ClasseId;
            insc.DateInscription = inscription.DateInscription;
            insc.Montant = inscription.Montant;
            db.SaveChanges();
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            Inscription i = db.inscriptions.Find(ID);
            db.inscriptions.Remove(i);
            db.SaveChanges();
            return Json(0, JsonRequestBehavior.AllowGet);
        }
    }
}