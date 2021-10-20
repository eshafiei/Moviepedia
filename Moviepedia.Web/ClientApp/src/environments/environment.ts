// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseUrl: 'http://moviepedia-dev.us-east-1.elasticbeanstalk.com/api',
  baseUrl: 'https://localhost:44339/api',
  moviedb_api_key: 'xxx',
  imageBaseUrl: 'https://image.tmdb.org/t/p/w500/',
  movieInfoApiEndPointBaseUrl: 'https://api.themoviedb.org/3/search/movie',
  creditInfoApiEndPointBaseUrl: 'https://api.themoviedb.org/3/movie',
  personInfoApiEndPointBaseUrl: 'https://api.themoviedb.org/3/person'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
