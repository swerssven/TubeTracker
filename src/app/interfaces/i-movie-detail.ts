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
  trailer: string;
  poster: string;
  backdrop: string;
  duration: number;
  movieReviews?: any;
}
