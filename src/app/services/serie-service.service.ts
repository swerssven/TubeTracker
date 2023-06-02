import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMovieSerieCard } from '../interfaces/i-movie-serie-card';
import { Observable } from 'rxjs';
import { IReview, IReviewDto } from '../interfaces/i-review';
import { ISerieDetail } from '../interfaces/i-serie-detail';
import { IRatings } from '../interfaces/i-ratings';
import { ISeasonsEpisodesListDto } from '../interfaces/i-season-episode';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SerieServiceService {
  apiUrl!: string;

  constructor(private http: HttpClient) {
    if (environment.production) {
      this.apiUrl = environment.apiUrl;
    } else {
      this.apiUrl = environment.apiUrl;
    }
  }

  getSerieSearchList(
    searchString: string,
    page: number,
    language: string,
    userId: number
  ): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(
      `${this.apiUrl}/api/Serie/getSerieSearchList?filter=${searchString}&page=${page}&language=${language}&userId=${userId}`
    );
  }

  getSeriePopularList(
    language: string,
    userId: number
  ): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(
      `${this.apiUrl}/api/Serie/getSeriePopularList?language=${language}&userId=${userId}`
    );
  }

  getSerieTopRatedList(
    language: string,
    userId: number
  ): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(
      `${this.apiUrl}/api/Serie/getSerieTopRatedList?language=${language}&userId=${userId}`
    );
  }

  getSerieDetails(
    serieId: number,
    language: string,
    userId: number
  ): Observable<ISerieDetail> {
    return this.http.get<ISerieDetail>(
      `${this.apiUrl}/api/Serie/getSerie?id=${serieId}&language=${language}&userId=${userId}`
    );
  }

  getSeasonsEpisodesList(
    serieApiId: number,
    userId: number
  ): Observable<ISeasonsEpisodesListDto> {
    return this.http.get<ISeasonsEpisodesListDto>(
      `${this.apiUrl}/api/Serie/getSeasonsEpisodesList?serieApiId=${serieApiId}&userId=${userId}`
    );
  }

  setSerieRating(
    serieApiId: number,
    userId: number,
    rating: number
  ): Observable<IRatings> {
    return this.http.post<IRatings>(
      `${this.apiUrl}/api/Serie/setSerieRating?serieApiId=${serieApiId}&userId=${userId}&rating=${rating}`,
      null
    );
  }

  getSerieRatings(serieApiId: number, userId: number): Observable<IRatings> {
    return this.http.get<IRatings>(
      `${this.apiUrl}/api/Serie/getSerieRatings?userId=${userId}&serieApiId=${serieApiId}`
    );
  }

  getSerieReviews(serieId: number): Observable<IReviewDto> {
    return this.http.get<IReviewDto>(
      `${this.apiUrl}/api/Serie/getReviews?serieApiId=${serieId}`
    );
  }

  createSerieReview(review: IReview): Observable<IReviewDto> {
    return this.http.post<IReviewDto>(
      `${this.apiUrl}/api/Serie/createReview`,
      review
    );
  }

  deleteSerieReview(serieReviewId: number): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.apiUrl}/api/Serie/DeleteSerieReview?serieReviewId=${serieReviewId}`,
      null
    );
  }

  setSerieWatched(
    serieApiId: number,
    userId: number,
    language: string,
    watched: boolean
  ): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.apiUrl}/api/Serie/setSerieWatched?serieApiId=${serieApiId}&userId=${userId}&language=${language}&watched=${watched}`,
      null
    );
  }

  setSeasonEpisodeWatched(
    serieApiId: number,
    seasonsEpisodeId: number,
    userId: number,
    watched: boolean
  ): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.apiUrl}/api/Serie/setSeasonEpisodeWatched?serieApiId=${serieApiId}&seasonsEpisodeId=${seasonsEpisodeId}&userId=${userId}&watched=${watched}`,
      null
    );
  }

  setSerieFavorite(
    serieApiId: number,
    userId: number,
    language: string,
    favorite: boolean
  ): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.apiUrl}/api/Serie/setSerieFavorite?serieApiId=${serieApiId}&userId=${userId}&language=${language}&favorite=${favorite}`,
      null
    );
  }

  getSerieFavoritesList(userId: number, language: string): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(
      `${this.apiUrl}/api/Serie/getSeriesFavoritesList?userId=${userId}&language=${language}`
    );
  }

  getLastWatchedSeriesList(userId: number, language: string): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(
      `${this.apiUrl}/api/Serie/getLastWatchedSeriesList?userId=${userId}&language=${language}`
    );
  }
}
