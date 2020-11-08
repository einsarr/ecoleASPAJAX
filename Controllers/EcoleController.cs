using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class EcoleController : Controller
    {
        private DBEcoleContext db = new DBEcoleContext();
        // GET: Classe
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            return Json(db.ecoles.ToList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Ecole ecole)
        {
            db.ecoles.Add(ecole);
            db.SaveChanges();
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            var ecole = db.ecoles.Find(ID);
            return Json(ecole, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Ecole ecole)
        {
            Ecole e = db.ecoles.Find(ecole.Id);
            e.Nom = ecole.Nom;
            e.Adresse = ecole.Adresse;
            e.TelephoneFix = ecole.TelephoneFix;
            e.TelephoneP = ecole.TelephoneP;
            e.Fax = ecole.Fax;
            e.Email = ecole.Email;
            e.Ninea = ecole.Ninea;
            e.DateCreation = ecole.DateCreation;
            e.Etat = ecole.Etat;
            e.Description = ecole.Description;
            db.SaveChanges();
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            Ecole e = db.ecoles.Find(ID);
            db.ecoles.Remove(e);
            db.SaveChanges();
            return Json(0, JsonRequestBehavior.AllowGet);
        }
    }
}