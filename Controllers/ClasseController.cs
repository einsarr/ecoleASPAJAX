using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class ClasseController : Controller
    {
        private DBEcoleContext db = new DBEcoleContext();
        // GET: Classe
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            return Json(db.classes.ToList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Classe classe)
        {
            db.classes.Add(classe);
            db.SaveChanges();
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            var classe = db.classes.Find(ID);
            return Json(classe, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Classe classe)
        {
            Classe cl = db.classes.Find(classe.Id);
            cl.Libelle = classe.Libelle;
            cl.NombreMax = classe.NombreMax;
            cl.Etat = classe.Etat;
            db.SaveChanges();
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            Classe cl = db.classes.Find(ID);
            db.classes.Remove(cl);
            db.SaveChanges();
            return Json(0, JsonRequestBehavior.AllowGet);
        }
    }
}