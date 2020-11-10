using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class RoleController : Controller
    {
        // GET: Role
        private DBEcoleContext db = new DBEcoleContext();
    
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            return Json(db.roles.ToList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Role role)
        {
            db.roles.Add(role);
            db.SaveChanges();
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            var role = db.roles.Find(ID);
            return Json(role, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Role role)
        {
            Role r = db.roles.Find(role.IdR);
            r.LibelleRole = role.LibelleRole;
            r.Etat = role.Etat;
            db.SaveChanges();
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            Role role = db.roles.Find(ID);
            db.roles.Remove(role);
            db.SaveChanges();
            return Json(0, JsonRequestBehavior.AllowGet);
        }
    }
}