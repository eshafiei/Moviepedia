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

        public async Task<IEnumerable<Title>> GetAllMovies()
        {
            var titles = await _titlesContext.Titles.ToListAsync();

            if (titles == null) 
            {
                return null;
            }

            return titles;
        }
    }
}
