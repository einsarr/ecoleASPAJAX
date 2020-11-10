using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace WebApplication1.Controllers
{
    public class UtilisateurController : Controller
    {
        private DBEcoleContext db = new DBEcoleContext();
        private ApplicationUserManager _userManager;
        public UtilisateurController()
        {
        }
        public UtilisateurController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }
        // GET: Utilisateur
        public ActionResult Index()
        {
            ViewBag.Role = db.roles.ToList();
            return View();
        }

        public JsonResult List()
        {
            return Json(db.utilisateurs.ToList(), JsonRequestBehavior.AllowGet);
        }

        public async Task<JsonResult> Add([Bind(Include = "IdU,Prenom,Nom,Identifiant,EmailU,TelephoneU,IdUser,Etat")] Utilisateur utilisateur, string Role)
        {
            var user = new ApplicationUser { UserName = utilisateur.Identifiant, Email = utilisateur.EmailU };
            var result = await UserManager.CreateAsync(user, "P@sser123");
            if (result.Succeeded)
            {
                UserManager.AddToRole(user.Id, Role);
                utilisateur.IdUser = user.Id;
                db.utilisateurs.Add(utilisateur);
                await db.SaveChangesAsync();
                //return RedirectToAction("Index");
            }
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            var utilisateur = db.utilisateurs.Find(ID);
            return Json(utilisateur, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Utilisateur utilisateur)
        {
            Utilisateur u = db.utilisateurs.Find(utilisateur.IdU);
            u.Prenom = utilisateur.Prenom;
            u.Nom = utilisateur.Nom;
            u.Etat = utilisateur.Etat;
            db.SaveChanges();
            return Json(1, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            Utilisateur utilisateur = db.utilisateurs.Find(ID);
            db.utilisateurs.Remove(utilisateur);
            db.SaveChanges();
            return Json(0, JsonRequestBehavior.AllowGet);
        }
    }
}