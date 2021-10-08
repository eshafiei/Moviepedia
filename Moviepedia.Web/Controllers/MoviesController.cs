using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moviepedia.Data.Entities;
using Moviepedia.Services.Movies;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Moviepedia.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class MoviesController : ControllerBase
    {
        //private readonly IMoviesService _moviesService;

        //public MoviesController(MoviesService moviesService)
        //{
        //    _moviesService = moviesService;
        //}

        //[HttpGet("[action]")]
        //public async Task<IEnumerable<Title>> GetAllMovies()
        //{
        //    return await _moviesService.GetAllMovies();
        //}

        private readonly TitlesContext _titlesContext;

        public MoviesController(TitlesContext titlesContext)
        {
            _titlesContext = titlesContext;
        }

        [HttpGet]
        public async Task<IEnumerable<Title>> GetAllMovies()
        {
            var titles = await _titlesContext.Titles
                .Include(p => p.TitleGenres)
                .ToListAsync();

            if (titles == null)
            {
                return null;
            }

            return titles;
        }
    }
}
