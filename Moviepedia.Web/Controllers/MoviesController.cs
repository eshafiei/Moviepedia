using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moviepedia.Data.Entities;
using Moviepedia.Services.Movies;
using System.Collections.Generic;
using System.Linq;
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
        public async Task<IEnumerable<Title>> GetAllTitles()
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

        [HttpGet("{titleId}")]
        public async Task<Title> GetTitleById(int titleId)
        {
            var title = await _titlesContext.Titles
                .Include(g => g.TitleGenres).ThenInclude(cs => cs.Genre)
                .Include(a => a.Awards)
                .Include(t => t.TitleParticipants).ThenInclude(cs => cs.Participant)
                .Include(s => s.StoryLines)
                .Include(o => o.OtherNames)
                .SingleOrDefaultAsync(t => t.TitleId == titleId);

            if (title == null)
            {
                return null;
            }

            return title;
        }
    }
}
