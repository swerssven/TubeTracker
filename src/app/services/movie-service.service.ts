import { Injectable } from '@angular/core';
import { IMovieSerieCard } from '../interfaces/i-movie-serie-card';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  constructor(private http: HttpClient) { }

  getMovieSearchList(searchString: string, page: number): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(`https://localhost:7203/api/Movie?filter=${searchString}&page=1&language=es-ES`);
  }
}
