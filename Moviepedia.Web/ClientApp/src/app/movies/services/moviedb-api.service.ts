import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class MovieDbApiService {
  constructor(private http: HttpClient) {}

  async getMovieInfo(titleName: string) : Promise<any> {
    const movieDbApiKey = environment.moviedb_api_key;
    const movieInfoApiEndPointBaseUrl = environment.movieInfoApiEndPointBaseUrl;
    return await this.http.get(`${movieInfoApiEndPointBaseUrl}?api_key=${movieDbApiKey}&query=${titleName}`).toPromise();
  }

  async getMovieCreditInfo(movieId: number) : Promise<any> {
    const movieDbApiKey = environment.moviedb_api_key;
    const creditInfoApiEndPointBaseUrl = environment.creditInfoApiEndPointBaseUrl;
    return await this.http.get(`${creditInfoApiEndPointBaseUrl}/${movieId}/credits?api_key=${movieDbApiKey}&language=en-US`).toPromise();
  }

  getPersonInfo(personId: number) : Observable<any> {
    const movieDbApiKey = environment.moviedb_api_key;
    const personInfoApiEndPointBaseUrl = environment.personInfoApiEndPointBaseUrl;
    return this.http.get(`${personInfoApiEndPointBaseUrl}/${personId}?api_key=${movieDbApiKey}&language=en-US`);
  }

}
