using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace Moviepedia.Web.Controllers
{
    public class FallbackController : Controller
    {
        public IActionResult Index()
        {
            return PhysicalFile(
                Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "index.html"), "text / HTML");
        }
    }
}
