import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMovieSerieCard } from '../interfaces/i-movie-serie-card';
import { Observable } from 'rxjs';
import { IReview, IReviewDto } from '../interfaces/i-review';
import { ISerieDetail } from '../interfaces/i-serie-detail';
import { IRatings } from '../interfaces/i-ratings';
import { ISeasonsEpisodesListDto } from '../interfaces/i-season-episode';

@Injectable({
  providedIn: 'root',
})
export class SerieServiceService {
  constructor(private http: HttpClient) {}

  getSerieSearchList(
    searchString: string,
    page: number,
    language: string,
    userId: number
  ): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(
      `https://localhost:7203/api/Serie/getSerieSearchList?filter=${searchString}&page=${page}&language=${language}&userId=${userId}`
    );
  }

  getSeriePopularList(
    language: string,
    userId: number
  ): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(
      `https://localhost:7203/api/Serie/getSeriePopularList?language=${language}&userId=${userId}`
    );
  }

  getSerieTopRatedList(
    language: string,
    userId: number
  ): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(
      `https://localhost:7203/api/Serie/getSerieTopRatedList?language=${language}&userId=${userId}`
    );
  }

  getSerieDetails(
    serieId: number,
    language: string,
    userId: number
  ): Observable<ISerieDetail> {
    return this.http.get<ISerieDetail>(
      `https://localhost:7203/api/Serie/getSerie?id=${serieId}&language=${language}&userId=${userId}`
    );
  }

  getSeasonsEpisodesList(
    serieApiId: number,
    userId: number
  ): Observable<ISeasonsEpisodesListDto> {
    return this.http.get<ISeasonsEpisodesListDto>(
      `https://localhost:7203/api/Serie/getSeasonsEpisodesList?serieApiId=${serieApiId}&userId=${userId}`
    );
  }

  setSerieRating(
    serieApiId: number,
    userId: number,
    rating: number
  ): Observable<IRatings> {
    return this.http.post<IRatings>(
      `https://localhost:7203/api/Serie/setSerieRating?serieApiId=${serieApiId}&userId=${userId}&rating=${rating}`,
      null
    );
  }

  getSerieRatings(serieApiId: number, userId: number): Observable<IRatings> {
    return this.http.get<IRatings>(
      `https://localhost:7203/api/Serie/getSerieRatings?userId=${userId}&serieApiId=${serieApiId}`
    );
  }

  getSerieReviews(serieId: number): Observable<IReviewDto> {
    return this.http.get<IReviewDto>(
      `https://localhost:7203/api/Serie/getReviews?serieApiId=${serieId}`
    );
  }

  createSerieReview(review: IReview): Observable<IReviewDto> {
    return this.http.post<IReviewDto>(
      `https://localhost:7203/api/Serie/createReview`,
      review
    );
  }

  setSerieWatched(
    serieApiId: number,
    userId: number,
    language: string,
    watched: boolean
  ): Observable<boolean> {
    return this.http.post<boolean>(
      `https://localhost:7203/api/Serie/setSerieWatched?serieApiId=${serieApiId}&userId=${userId}&language=${language}&watched=${watched}`,
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
      `https://localhost:7203/api/Serie/setSeasonEpisodeWatched?serieApiId=${serieApiId}&seasonsEpisodeId=${seasonsEpisodeId}&userId=${userId}&watched=${watched}`,
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
      `https://localhost:7203/api/Serie/setSerieFavorite?serieApiId=${serieApiId}&userId=${userId}&language=${language}&favorite=${favorite}`,
      null
    );
  }

  getSerieFavoritesList(userId: number, language: string): Observable<IMovieSerieCard[]> {
    return this.http.get<IMovieSerieCard[]>(
      `https://localhost:7203/api/Serie/getSeriesFavoritesList?userId=${userId}&language=${language}`
    );
  }
}
