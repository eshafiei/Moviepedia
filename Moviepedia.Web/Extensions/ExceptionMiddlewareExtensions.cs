using Microsoft.AspNetCore.Builder;
using Moviepedia.Web.Handlers;

namespace Moviepedia.Web.Extensions
{
    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureCustomExceptionMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }
    }
}
