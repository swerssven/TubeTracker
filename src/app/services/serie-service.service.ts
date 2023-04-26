import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMovieSerieCard } from '../interfaces/i-movie-serie-card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SerieServiceService {

  constructor(private http: HttpClient) { }

  getSerieSearchList(searchString: string, page: number, language: string): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(`https://localhost:7203/api/Serie/getSerieSearchList?filter=${searchString}&page=${page}&language=${language}`);
  }

  getSeriePopularList(language: string): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(`https://localhost:7203/api/Serie/getSeriePopularList?language=${language}`);
  }

  getSerieTopRatedList(language: string): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(`https://localhost:7203/api/Serie/getSerieTopRatedList?language=${language}`);
  }
}
