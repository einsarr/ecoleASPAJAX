using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace WebApplication1.Models
{
    public class DBEcoleContext:DbContext
    {
        public DBEcoleContext() : base("connexionEcole") { }
        

        public DbSet<Classe> classes { get; set; }
        public DbSet<Professeur> professeurs { get; set; }
        public DbSet<Matiere> matieres { get; set; }
        public DbSet<Etudiant> etudiants { get; set; }
        public DbSet<Inscription> inscriptions { get; set; }
        public DbSet<Affectation> affectations { get; set; }
        public DbSet<ParamAnnee> paramAnnees { get; set; }
        public DbSet<Utilisateur> utilisateurs { get; set; }
        public DbSet<Role> roles { get; set; }
    }
}