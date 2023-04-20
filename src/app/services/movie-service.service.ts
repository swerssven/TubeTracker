import { Injectable } from '@angular/core';
import { IMovieSerieCard } from '../interfaces/i-movie-serie-card';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IMovieDetail } from '../interfaces/i-movie-detail';
import { IReview } from '../interfaces/i-review';
import { IRatings } from '../interfaces/i-ratings';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  constructor(private http: HttpClient) { }

  getMovieSearchList(searchString: string, page: number): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(`https://localhost:7203/api/Movie/getMovieSearchList?filter=${searchString}&page=1&language=es-ES`);
  }

  getMovieDetails(movieId: number, language: string, userId: number): Observable<IMovieDetail>{
    return this.http.get<IMovieDetail>(`https://localhost:7203/api/Movie/getMovie?id=${movieId}&language=es-ES&userId=${userId}`);
  }

  setMovieRating(movieApiId: number, userId: number, rating: number): Observable<IRatings>{
    return this.http.post<IRatings>(`https://localhost:7203/api/Movie/setMovieRating?movieApiId=${movieApiId}&userId=${userId}&rating=${rating}`, null);
  }

  getMovieRatings(movieApiId: number, userId: number): Observable<IRatings>{
    return this.http.get<IRatings>(`https://localhost:7203/api/Movie/getMovieRatings?userId=${userId}&movieApiId=${movieApiId}`);
  }

  getMovieReviews(movieId: number): Observable<IReview[]>{
    return this.http.get<IReview[]>(`https://localhost:7203/api/Movie/getReviews?movieApiId=${movieId}`);
  }

  createMovieReview(review: IReview): Observable<IReview[]>{
    return this.http.post<IReview[]>(`https://localhost:7203/api/Movie/createReview`,review);
  }
}
