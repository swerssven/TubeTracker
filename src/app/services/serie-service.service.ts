import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMovieSerieCard } from '../interfaces/i-movie-serie-card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SerieServiceService {

  constructor(private http: HttpClient) { }

  getSerieSearchList(searchString: string, page: number): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(`https://localhost:7203/api/getSerieSearchList?filter=${searchString}&page=1`);
  }
}
