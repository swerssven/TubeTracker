import { Injectable } from '@angular/core';
import { IMovieSerieCard } from '../interfaces/i-movie-serie-card';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IMovieDetail } from '../interfaces/i-movie-detail';
import { IReview, IReviewDto } from '../interfaces/i-review';
import { IRatings } from '../interfaces/i-ratings';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieServiceService {
  apiUrl!: string;

  constructor(private http: HttpClient) {
    if (environment.production) {
      this.apiUrl = environment.apiUrl;
    } else {
      this.apiUrl = environment.apiUrl;
    }
  }

  getMovieSearchList(
    searchString: string,
    page: number,
    language: string,
    userId: number
  ): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(
      `${this.apiUrl}/api/Movie/getMovieSearchList?filter=${searchString}&page=${page}&language=${language}&userId=${userId}`
    );
  }

  getMoviePopularList(
    language: string,
    userId: number
  ): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(
      `${this.apiUrl}/api/Movie/getMoviePopularList?language=${language}&userId=${userId}`
    );
  }

  getMovieTopRatedList(
    language: string,
    userId: number
  ): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(
      `${this.apiUrl}/api/Movie/getMovieTopRatedList?language=${language}&userId=${userId}`
    );
  }

  getMovieDetails(
    movieId: number,
    language: string,
    userId: number
  ): Observable<IMovieDetail> {
    return this.http.get<IMovieDetail>(
      `${this.apiUrl}/api/Movie/getMovie?id=${movieId}&language=${language}&userId=${userId}`
    );
  }

  setMovieRating(
    movieApiId: number,
    userId: number,
    rating: number
  ): Observable<IRatings> {
    return this.http.post<IRatings>(
      `${this.apiUrl}/api/Movie/setMovieRating?movieApiId=${movieApiId}&userId=${userId}&rating=${rating}`,
      null
    );
  }

  getMovieRatings(movieApiId: number, userId: number): Observable<IRatings> {
    return this.http.get<IRatings>(
      `${this.apiUrl}/api/Movie/getMovieRatings?userId=${userId}&movieApiId=${movieApiId}`
    );
  }

  getMovieReviews(movieId: number): Observable<IReviewDto> {
    return this.http.get<IReviewDto>(
      `${this.apiUrl}/api/Movie/getReviews?movieApiId=${movieId}`
    );
  }

  createMovieReview(review: IReview): Observable<IReviewDto> {
    return this.http.post<IReviewDto>(
      `${this.apiUrl}/api/Movie/createReview`,
      review
    );
  }

  setMovieWatched(
    movieApiId: number,
    userId: number,
    language: string,
    watched: boolean
  ): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.apiUrl}/api/Movie/setMovieWatched?movieApiId=${movieApiId}&userId=${userId}&language=${language}&watched=${watched}`,
      null
    );
  }

  setMovieFavorite(
    movieApiId: number,
    userId: number,
    language: string,
    favorite: boolean
  ): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.apiUrl}/api/Movie/setMovieFavorite?movieApiId=${movieApiId}&userId=${userId}&language=${language}&favorite=${favorite}`,
      null
    );
  }

  getMovieFavoritesList(userId: number, language: string): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(
      `${this.apiUrl}/api/Movie/getMovieFavoritesList?userId=${userId}&language=${language}`
    );
  }

  getLastWatchedMoviesList(userId: number, language: string): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(`${this.apiUrl}/api/Movie/getLastWatchedMoviesList?userId=${userId}&language=${language}`);
  }
}
