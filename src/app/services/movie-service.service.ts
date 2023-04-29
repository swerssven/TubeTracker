import { Injectable } from '@angular/core';
import { IMovieSerieCard } from '../interfaces/i-movie-serie-card';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IMovieDetail } from '../interfaces/i-movie-detail';
import { IReview, IReviewDto } from '../interfaces/i-review';
import { IRatings } from '../interfaces/i-ratings';

@Injectable({
  providedIn: 'root',
})
export class MovieServiceService {
  constructor(private http: HttpClient) {}

  getMovieSearchList(
    searchString: string,
    page: number,
    language: string,
    userId: number
  ): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(
      `https://localhost:7203/api/Movie/getMovieSearchList?filter=${searchString}&page=${page}&language=${language}&userId=${userId}`
    );
  }

  getMoviePopularList(
    language: string,
    userId: number
  ): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(
      `https://localhost:7203/api/Movie/getMoviePopularList?language=${language}&userId=${userId}`
    );
  }

  getMovieTopRatedList(
    language: string,
    userId: number
  ): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(
      `https://localhost:7203/api/Movie/getMovieTopRatedList?language=${language}&userId=${userId}`
    );
  }

  getMovieDetails(
    movieId: number,
    language: string,
    userId: number
  ): Observable<IMovieDetail> {
    return this.http.get<IMovieDetail>(
      `https://localhost:7203/api/Movie/getMovie?id=${movieId}&language=${language}&userId=${userId}`
    );
  }

  setMovieRating(
    movieApiId: number,
    userId: number,
    rating: number
  ): Observable<IRatings> {
    return this.http.post<IRatings>(
      `https://localhost:7203/api/Movie/setMovieRating?movieApiId=${movieApiId}&userId=${userId}&rating=${rating}`,
      null
    );
  }

  getMovieRatings(movieApiId: number, userId: number): Observable<IRatings> {
    return this.http.get<IRatings>(
      `https://localhost:7203/api/Movie/getMovieRatings?userId=${userId}&movieApiId=${movieApiId}`
    );
  }

  getMovieReviews(movieId: number): Observable<IReviewDto> {
    return this.http.get<IReviewDto>(
      `https://localhost:7203/api/Movie/getReviews?movieApiId=${movieId}`
    );
  }

  createMovieReview(review: IReview): Observable<IReviewDto> {
    return this.http.post<IReviewDto>(
      `https://localhost:7203/api/Movie/createReview`,
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
      `https://localhost:7203/api/Movie/setMovieWatched?movieApiId=${movieApiId}&userId=${userId}&language=${language}&watched=${watched}`,
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
      `https://localhost:7203/api/Movie/setMovieFavorite?movieApiId=${movieApiId}&userId=${userId}&language=${language}&favorite=${favorite}`,
      null
    );
  }
}
