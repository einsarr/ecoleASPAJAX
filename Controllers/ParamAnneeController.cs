using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class ParamAnneeController : Controller
    {
        private DBEcoleContext db = new DBEcoleContext();
        // GET: Classe
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            return Json(db.paramAnnees.ToList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(ParamAnnee param)
        {
            db.paramAnnees.Add(param);
            db.SaveChanges();
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            var param = db.paramAnnees.Find(ID);
            return Json(param, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(ParamAnnee param)
        {
            ParamAnnee par = db.paramAnnees.Find(param.Id);
            par.CodeAnnee = param.CodeAnnee;
            par.LibelleAnnee = param.LibelleAnnee;
            par.Etat = param.Etat;
            db.SaveChanges();
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            ParamAnnee p = db.paramAnnees.Find(ID);
            db.paramAnnees.Remove(p);
            db.SaveChanges();
            return Json(0, JsonRequestBehavior.AllowGet);
        }
    }
}