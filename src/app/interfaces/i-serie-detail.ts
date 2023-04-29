export interface ISerieDetail {
  serieId: number;
  serieApiId: number;
  titleEn?: string;
  titleEs?: string;
  descriptionEn?: string;
  descriptionEs?: string;
  actors: string;
  creators: string;
  genresEn?: string;
  genresEs?: string;
  premiereDate: Date;
  poster: string;
  backdrop: string;
  movieReviews?: any;
  rating?: number;
  numEpisodes: number;
  favorite: boolean;
  watched: boolean;
}
