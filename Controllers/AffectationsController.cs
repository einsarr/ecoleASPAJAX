using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class AffectationsController : Controller
    {
        private DBEcoleContext db = new DBEcoleContext();

        // GET: Affectations
        public ActionResult Index()
        {
            var affectations = db.affectations.Include(a => a.Classe).Include(a => a.Matiere).Include(a => a.Professeur);
            return View(affectations.ToList());
        }

        // GET: Affectations/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Affectation affectation = db.affectations.Find(id);
            if (affectation == null)
            {
                return HttpNotFound();
            }
            return View(affectation);
        }

        // GET: Affectations/Create
        public ActionResult Create()
        {
            ViewBag.ClasseId = new SelectList(db.classes, "Id", "Libelle");
            ViewBag.MatiereId = new SelectList(db.matieres, "Id", "Libelle");
            ViewBag.ProfesseurId = new SelectList(db.professeurs, "Id", "Prenom");
            return View();
        }

        // POST: Affectations/Create
        // Afin de déjouer les attaques par sur-validation, activez les propriétés spécifiques que vous voulez lier. Pour 
        // plus de détails, voir  https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,DateAffectation,DureeCours,ClasseId,ProfesseurId,MatiereId,QuantumHoraire")] Affectation affectation)
        {
            if (ModelState.IsValid)
            {
                db.affectations.Add(affectation);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ClasseId = new SelectList(db.classes, "Id", "Libelle", affectation.ClasseId);
            ViewBag.MatiereId = new SelectList(db.matieres, "Id", "Libelle", affectation.MatiereId);
            ViewBag.ProfesseurId = new SelectList(db.professeurs, "Id", "Prenom", affectation.ProfesseurId);
            return View(affectation);
        }

        // GET: Affectations/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Affectation affectation = db.affectations.Find(id);
            if (affectation == null)
            {
                return HttpNotFound();
            }
            ViewBag.ClasseId = new SelectList(db.classes, "Id", "Libelle", affectation.ClasseId);
            ViewBag.MatiereId = new SelectList(db.matieres, "Id", "Libelle", affectation.MatiereId);
            ViewBag.ProfesseurId = new SelectList(db.professeurs, "Id", "Prenom", affectation.ProfesseurId);
            return View(affectation);
        }

        // POST: Affectations/Edit/5
        // Afin de déjouer les attaques par sur-validation, activez les propriétés spécifiques que vous voulez lier. Pour 
        // plus de détails, voir  https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,DateAffectation,DureeCours,ClasseId,ProfesseurId,MatiereId,QuantumHoraire")] Affectation affectation)
        {
            if (ModelState.IsValid)
            {
                db.Entry(affectation).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ClasseId = new SelectList(db.classes, "Id", "Libelle", affectation.ClasseId);
            ViewBag.MatiereId = new SelectList(db.matieres, "Id", "Libelle", affectation.MatiereId);
            ViewBag.ProfesseurId = new SelectList(db.professeurs, "Id", "Prenom", affectation.ProfesseurId);
            return View(affectation);
        }

        // GET: Affectations/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Affectation affectation = db.affectations.Find(id);
            if (affectation == null)
            {
                return HttpNotFound();
            }
            return View(affectation);
        }

        // POST: Affectations/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Affectation affectation = db.affectations.Find(id);
            db.affectations.Remove(affectation);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
