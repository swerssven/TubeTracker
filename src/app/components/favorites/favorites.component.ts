import { Component } from '@angular/core';
import { IMovieSerieCard } from 'src/app/interfaces/i-movie-serie-card';
import { MovieServiceService } from 'src/app/services/movie-service.service';
import { SerieServiceService } from 'src/app/services/serie-service.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  selectedRadio: string = 'movies';
  searchString: string = '';
  isLoading = false;
  movies_series: IMovieSerieCard[] = [];
  user!: any;

  constructor(
    private movieService: MovieServiceService,
    private serieService: SerieServiceService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }

    this.movieService
      .getMovieFavoritesList(this.user.userId, this.user.language)
      .subscribe((data) => {
        console.log(data);
        data.forEach((movie) => {
          movie.type = 'movies';
        });
        this.movies_series.push(...data);
      });

    this.serieService
      .getSerieFavoritesList(this.user.userId, this.user.language)
      .subscribe((data) => {
        console.log(data);
        data.forEach((serie) => {
          serie.type = 'series';
        });
        this.movies_series.push(...data);
      });
  }
}
