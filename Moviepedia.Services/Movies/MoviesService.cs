using Moviepedia.Data.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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
            var titles = _titlesContext.Titles
                .OrderBy(t => t.TitleName)
                .ToListAsync();

            if (titles.Result == null) 
            {
                return null;
            }

            return await titles;
        }

        public async Task<Title> GetTitleById(int titleId)
        {
            var title = _titlesContext.Titles
                .Include(g => g.TitleGenres).ThenInclude(cs => cs.Genre)
                .Include(a => a.Awards.OrderBy(a => a.AwardCompany))
                .Include(t => t.TitleParticipants.Where(p => p.IsKey == true || (
                    p.RoleType.ToLower() == "screenplay") || p.RoleType.ToLower() == "producer" || 
                    p.RoleType.ToLower() == "director"))
                .ThenInclude(cs => cs.Participant)
                .Include(s => s.StoryLines)
                .Include(o => o.OtherNames)  
                .OrderBy(t => t.TitleName)
                .SingleOrDefaultAsync(t => t.TitleId == titleId);

            if (title.Result == null)
            {
                return null;
            }

            return await title;
        }
    }
}
