import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieServiceService } from 'src/app/services/movie-service.service';
import { SerieServiceService } from 'src/app/services/serie-service.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-serie-card.component.html',
  styleUrls: ['./movie-serie-card.component.scss'],
})
export class MovieSerieCardComponent {
  @Input() movie_serie!: any;
  @Input() type!: string;
  date!: Date;
  user!: any;
  isLoading: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private movieService: MovieServiceService,
    private serieService: SerieServiceService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }

    if (this.type == 'movies') {
      this.date = this.movie_serie.release_date
        ? new Date(this.movie_serie.release_date)
        : new Date();
    } else if (this.type == 'series') {
      this.date = this.movie_serie.first_air_date
        ? new Date(this.movie_serie.first_air_date)
        : new Date();
    }
  }

  markWatched() {
    if (this.type == 'movies') {
      let watched = this.movie_serie.watched ? false : true;
      this.subscriptions.add(
        this.movieService
          .setMovieWatched(
            this.movie_serie.id,
            this.user.userId,
            this.user.language,
            watched
          )
          .subscribe((data) => {
            this.movie_serie.watched = data;
          })
      );
    } else if (this.type == 'series') {
      let watched = this.movie_serie.watched ? false : true;
      this.subscriptions.add(
        this.serieService
          .setSerieWatched(
            this.movie_serie.id,
            this.user.userId,
            this.user.language,
            watched
          )
          .subscribe((data) => {
            this.movie_serie.watched = data;
          })
      );
    }
  }

  markFavorite() {
    if (this.type == 'movies') {
      let favorite = this.movie_serie.favorite ? false : true;
      this.subscriptions.add(this.movieService
        .setMovieFavorite(
          this.movie_serie.id,
          this.user.userId,
          this.user.language,
          favorite
        )
        .subscribe((data) => {
          this.movie_serie.favorite = data;
        }));
    } else if (this.type == 'series') {
      let favorite = this.movie_serie.favorite ? false : true;
      this.subscriptions.add(this.serieService
        .setSerieFavorite(
          this.movie_serie.id,
          this.user.userId,
          this.user.language,
          favorite
        )
        .subscribe((data) => {
          this.movie_serie.favorite = data;
        }));
    }
  }

  loadingDetails(){
    this.isLoading = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
