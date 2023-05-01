import { Component } from '@angular/core';
import { MovieServiceService } from 'src/app/services/movie-service.service';
import { SerieServiceService } from 'src/app/services/serie-service.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent {
  selectedRadio: string = 'movies';
  searchString: string = '';
  isLoading = false;
  movies_series!: any;
  user!: any;
  alphabet = 'abcdefghijklmnopqrstuvwxyz';

  constructor(
    private movieService: MovieServiceService,
    private serieService: SerieServiceService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }

    this.movieService // Get random movies to initialize the search page.
      .getMovieSearchList(
        this.alphabet[Math.floor(Math.random() * this.alphabet.length)],
        1,
        this.user.language,
        this.user.userId
      )
      .subscribe((data) => {
        this.movies_series = data;
      });
  }

  searchMoviesSeries() {
    this.isLoading = true;
    if (this.selectedRadio === 'movies') {
      this.movieService
        .getMovieSearchList(
          this.searchString,
          1,
          this.user.language,
          this.user.userId
        )
        .subscribe((movies) => {
          this.movies_series = movies;
          this.isLoading = false;
          console.log(movies)
        });
    } else if (this.selectedRadio === 'series') {
      this.serieService
        .getSerieSearchList(
          this.searchString,
          1,
          this.user.language,
          this.user.userId
        )
        .subscribe((series) => {
          this.movies_series = series;
          this.isLoading = false;
        });
    }
    this.searchString = "";
  }
}
