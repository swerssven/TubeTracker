import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMovieSerieCard } from 'src/app/interfaces/i-movie-serie-card';
import { MovieServiceService } from 'src/app/services/movie-service.service';
import { SerieServiceService } from 'src/app/services/serie-service.service';
import { UtilsServiceService } from 'src/app/services/utils-service.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  selectedRadio: string = 'movies';
  selectedWatched: string = "all";
  selectedType: string = "all";
  selectedOrder: string = 'none';
  searchString: string = '';
  isLoading = false;
  movies_series: IMovieSerieCard[] = [];
  filteredMovies_Series: IMovieSerieCard[] = [];
  user!: any;
  searchFilter: string = "";
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

    this.subscriptions.add(this.movieService
      .getMovieFavoritesList(this.user.userId, this.user.language)
      .subscribe((data) => {
        data.forEach((movie) => {
          movie.type = 'movies';
          this.isLoading = false;
        });
        this.movies_series.push(...data);
        this.filteredMovies_Series.push(...data);
      }));

    this.subscriptions.add(this.serieService
      .getSerieFavoritesList(this.user.userId, this.user.language)
      .subscribe((data) => {
        data.forEach((serie) => {
          serie.type = 'series';
          this.isLoading = false;
        });
        this.movies_series.push(...data);
        this.filteredMovies_Series.push(...data);
      }));
  }

  // Filter method, filter by string, watched, type and order.
  filterItems() {
    let filteredMovies_Series = this.movies_series.filter(item => {
      const typeMatch = this.selectedType === 'all' || item.type === this.selectedType;
      const statusMatch = this.selectedWatched === 'all' || item.watched.toString() === this.selectedWatched;
      return typeMatch && statusMatch;
    });

    if (this.selectedOrder === 'dateAsc') {
      filteredMovies_Series.sort((a, b) => this.getDateTime(a).getTime() - this.getDateTime(b).getTime());
    } else if (this.selectedOrder === 'dateDesc') {
      filteredMovies_Series.sort((a, b) => this.getDateTime(b).getTime() - this.getDateTime(a).getTime());
    } else if (this.selectedOrder === 'titleAsc') {
      filteredMovies_Series.sort((a, b) => this.getTitle(a).localeCompare(this.getTitle(b)));
    } else if (this.selectedOrder === 'titleDesc') {
      filteredMovies_Series.sort((a, b) => this.getTitle(b).localeCompare(this.getTitle(a)));
    }

    this.filteredMovies_Series = filteredMovies_Series;
  }

  // Convert date for diferent object date names.
  getDateTime(item: any): Date {
    return new Date(item.date || item.release_date || item.first_air_date || '');
  }

  // Convert title for diferent object title names.
  getTitle(item: any): string {
    return item.title || item.name || '';
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
