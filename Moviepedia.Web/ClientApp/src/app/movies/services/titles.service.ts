import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  constructor(private http: HttpClient) {}

  getAllTitles(): Observable<any> {
    const baseUrl = environment.baseUrl;
    return this.http.get(baseUrl + '/movies/getAllMovies');
  }
}
