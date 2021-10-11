using Moviepedia.Data.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Moviepedia.Services.Movies
{
    public class MoviesService : IMoviesService
    {
        private readonly TitlesContext _titlesContext;

        public MoviesService(TitlesContext titlesContext)
        {
            _titlesContext = titlesContext;
        }

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
