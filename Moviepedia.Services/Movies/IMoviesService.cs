using Moviepedia.Data.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Moviepedia.Services.Movies
{
    public interface IMoviesService
    {
        Task<IEnumerable<Title>> GetAllMovies();
    }
}
