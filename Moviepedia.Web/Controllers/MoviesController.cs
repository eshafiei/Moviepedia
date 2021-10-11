using Microsoft.AspNetCore.Mvc;
using Moviepedia.Services.Movies;
using System.Threading.Tasks;

namespace Moviepedia.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class MoviesController : ControllerBase
    {
        private readonly IMoviesService _moviesService;

        public MoviesController(IMoviesService moviesService)
        {
            _moviesService = moviesService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTitles()
        {
            var response = await _moviesService.GetAllTitles();

            if (response == null)
            {
                return NotFound();
            }

            return Ok(response);
        }

        [HttpGet("{titleId}")]
        public async Task<IActionResult> GetTitleById(int titleId)
        {
            var response = await _moviesService.GetTitleById(titleId);

            if (response == null)
            {
                return NotFound();
            }

            return Ok(response);            
        }
    }
}
