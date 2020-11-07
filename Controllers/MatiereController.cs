using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class MatiereController : Controller
    {
        private DBEcoleContext db = new DBEcoleContext();
        // GET: Matiere
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            return Json(db.matieres.ToList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Matiere matiere)
        {
            db.matieres.Add(matiere);
            db.SaveChanges();
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            var matiere = db.matieres.Find(ID);
            return Json(matiere, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Matiere matiere)
        {
            Matiere mat = db.matieres.Find(matiere.Id);
            mat.Libelle = matiere.Libelle;
            mat.Coefficient = matiere.Coefficient;
            mat.Etat = matiere.Etat;
            db.SaveChanges();
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            Matiere mat = db.matieres.Find(ID);
            db.matieres.Remove(mat);
            db.SaveChanges();
            return Json(0, JsonRequestBehavior.AllowGet);
        }
    }
}