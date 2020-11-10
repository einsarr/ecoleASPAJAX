using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Owin;
using WebApplication1.Models;

[assembly: OwinStartupAttribute(typeof(WebApplication1.Startup))]
namespace WebApplication1
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            createRolesandUsers();
        }

        /// <summary>
        /// Génération automatique des rôles et du super user au démarrage du projet
        /// </summary>
        private void createRolesandUsers()
        {
            //Déclaration du context qui permet d'accéder aux informations sécuritaires
            ApplicationDbContext context = new ApplicationDbContext();
            //Déclaration du context qui permet d'accéder à la base de données
            DBEcoleContext db = new DBEcoleContext();

            //Composant permettant de gérer les rôles
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            //Composant permetant de gérer les utilisateurs
            var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));

            //Vérification si le rôle admin existe ,sinon créer le rôle admin et le super user
            if (!roleManager.RoleExists("Admin"))
            {
                // first we create Admin rool  
                var role = new Microsoft.AspNet.Identity.EntityFramework.IdentityRole();
                role.Name = "Admin";
                roleManager.Create(role);

                Role r = new Role();
                r.LibelleRole = "Admin";
                r.Etat = 1;
                db.roles.Add(r);
                db.SaveChanges();
                //Here we create a Admin super user who will maintain the website                 

                var user = new ApplicationUser();
                user.UserName = "Admin";
                user.Email = "einsarr@gmail.com";
                string userPWD = "P@sser123";
                var chkUser = UserManager.Create(user, userPWD);

                Utilisateur u = new Utilisateur();
                u.Prenom = "Moussa SARR";
                u.Nom = "SARR";
                u.Identifiant = user.UserName;
                u.EmailU = user.Email;
                u.TelephoneU = "777437440";
                u.IdUser = user.Id;
                db.utilisateurs.Add(u);
                db.SaveChanges();

                //Add default User to Role Admin  
                if (chkUser.Succeeded)
                {
                    var result1 = UserManager.AddToRole(user.Id, "Admin");
                }
            }

            //  Creating AGENT DE SAISIE role   
            if (!roleManager.RoleExists("User"))
            {
                var role = new Microsoft.AspNet.Identity.EntityFramework.IdentityRole();
                role.Name = "User";
                roleManager.Create(role);

                Role r = new Role();
                r.LibelleRole = "User";
                r.Etat = 1;
                db.SaveChanges();
            }

            //  Creating AGENT DE SAISIE role   
            if (!roleManager.RoleExists("AgentSaisie"))
            {
                var role = new Microsoft.AspNet.Identity.EntityFramework.IdentityRole();
                role.Name = "AgentSaisie";
                roleManager.Create(role);

                Role r = new Role();
                r.LibelleRole = "AgentSaisie";
                r.Etat = 1;
                db.SaveChanges();
            }

            //  Creating SUPERVISEUR POLE role   
            if (!roleManager.RoleExists("Superviseur"))
            {
                var role = new Microsoft.AspNet.Identity.EntityFramework.IdentityRole();
                role.Name = "Superviseur";
                roleManager.Create(role);

                Role r = new Role();
                r.LibelleRole = "Superviseur";
                r.Etat = 1;
                db.SaveChanges();
            }

            // Creating AGENT SIGNATAIRE role   
            if (!roleManager.RoleExists("AgentSignataire"))
            {
                var role = new Microsoft.AspNet.Identity.EntityFramework.IdentityRole();
                role.Name = "AgentSignataire";
                roleManager.Create(role);

                Role r = new Role();
                r.LibelleRole = "AgentSignataire";
                r.Etat = 1;
                db.SaveChanges();
            }

            //  Creating AGENT RECEVABILITE role   
            if (!roleManager.RoleExists("Recevabilite"))
            {
                var role = new Microsoft.AspNet.Identity.EntityFramework.IdentityRole();
                role.Name = "Recevabilite";
                roleManager.Create(role);

                Role r = new Role();
                r.LibelleRole = "Recevabilite";
                r.Etat = 1;
                db.SaveChanges();
            }
        }
    }
}
