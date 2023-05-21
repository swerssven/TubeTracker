export interface IMovieSerieCard {
  id?: number,
  poster_path: string;
  title?: string;
  name?: string;
  favorite: boolean;
  watched: boolean;
  dateAddedFavorite?: Date;
  type?: string;
}
