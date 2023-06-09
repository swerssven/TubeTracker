export interface IMovieDetail {
  movieId: number;
  movieApiId: number;
  titleEn?: string;
  titleEs?: string;
  descriptionEn?: string;
  descriptionEs?: string;
  actors: string;
  directors: string;
  genresEn?: string;
  genresEs?: string;
  premiereDate: Date;
  trailerEn?: string;
  trailerEs?: string;
  poster: string;
  backdrop: string;
  duration: number;
  movieReviews?: any;
  rating?: number;
  favorite: boolean;
  watched: boolean;
}
