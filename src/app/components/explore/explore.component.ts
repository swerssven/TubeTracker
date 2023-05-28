import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieServiceService } from 'src/app/services/movie-service.service';
import { SerieServiceService } from 'src/app/services/serie-service.service';
import { UtilsServiceService } from 'src/app/services/utils-service.service';

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
  private subscriptions: Subscription = new Subscription();

  constructor(
    private movieService: MovieServiceService,
    private serieService: SerieServiceService,
    public utils: UtilsServiceService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }

    this.subscriptions.add(this.movieService // Get random movies to initialize the search page.
      .getMovieSearchList(
        this.alphabet[Math.floor(Math.random() * this.alphabet.length)],
        1,
        this.user.language,
        this.user.userId
      )
      .subscribe((data) => {
        this.movies_series = data;
        this.isLoading = false;
      }));
  }

  searchMoviesSeries() {
    this.isLoading = true;
    if (this.selectedRadio === 'movies') {
      this.subscriptions.add(this.movieService
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
        }));
    } else if (this.selectedRadio === 'series') {
      this.subscriptions.add(this.serieService
        .getSerieSearchList(
          this.searchString,
          1,
          this.user.language,
          this.user.userId
        )
        .subscribe((series) => {
          this.movies_series = series;
          this.isLoading = false;
        }));
    }
    this.searchString = "";
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
