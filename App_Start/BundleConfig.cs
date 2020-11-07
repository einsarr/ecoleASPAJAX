using System.Web;
using System.Web.Optimization;

namespace WebApplication1
{
    public class BundleConfig
    {
        // Pour plus d'informations sur le regroupement, visitez https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/Classes").Include(
                        "~/Scripts/Classes.js"));

            // Utilisez la version de développement de Modernizr pour le développement et l'apprentissage. Puis, une fois
            // prêt pour la production, utilisez l'outil de génération à l'adresse https://modernizr.com pour sélectionner uniquement les tests dont vous avez besoin.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"
                      ));
            //CSS LOGIN
            bundles.Add(new StyleBundle("~/ContentLogin/css").Include(
                      "~/templ/plugins/fontawesome-free/css/all.min.css",
                      "~/templ/plugins/icheck-bootstrap/icheck-bootstrap.min.css",
                      "~/templ/dist/css/adminlte.min.css"
                      ));
            //SCRIPT LOGIN
            bundles.Add(new ScriptBundle("~/bundlesLogin/js").Include(
                      "~/templ/plugins/jquery/jquery.min.js",
                      "~/templ/plugins/bootstrap/js/bootstrap.bundle.min.js",
                      "~/templ/dist/js/adminlte.min.js"
              ));

            //CSS ADMIN
            bundles.Add(new StyleBundle("~/ContentAdmin/css").Include(
                      "~/templ/plugins/fontawesome-free/css/all.min.css",
                      "~/templ/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css",
                      "~/templ/plugins/icheck-bootstrap/icheck-bootstrap.min.css",
                      "~/templ/plugins/jqvmap/jqvmap.min.css",
                      "~/templ/plugins/overlayScrollbars/css/OverlayScrollbars.min.css",
                      "~/templ/plugins/daterangepicker/daterangepicker.css",
                      "~/templ/plugins/summernote/summernote-bs4.css"
                      ));
            //SCRIPT ADMIN
            bundles.Add(new ScriptBundle("~/bundlesAdmin/js").Include(
                      "~/templ/plugins/jquery/jquery.min.js",
                      "~/templ/plugins/jquery-ui/jquery-ui.min.js",
                      "~/templ/plugins/bootstrap/js/bootstrap.bundle.min.js",
                      "~/templ/plugins/chart.js/Chart.min.js",
                      "~/templ/plugins/sparklines/sparkline.js",
                      "~/templ/plugins/jqvmap/jquery.vmap.min.js",
                      "~/templ/plugins/jqvmap/maps/jquery.vmap.usa.js",
                      "~/templ/plugins/jquery-knob/jquery.knob.min.js",
                      "~/templ/plugins/daterangepicker/daterangepicker.js",
                      "~/templ/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js",
                      "~/templ/plugins/summernote/summernote-bs4.min.js",
                      "~/templ/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js",
                      "~/templ/dist/js/adminlte.js",
                      "~/templ/dist/js/pages/dashboard.js",
                      "~/templ/dist/js/demo.js"
              ));

        }
    }
}
