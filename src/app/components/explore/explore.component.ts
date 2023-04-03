import { Component } from '@angular/core';
import { IMovieSerieCard } from 'src/app/interfaces/i-movie-serie-card';
import { MovieServiceService } from 'src/app/services/movie-service.service';
import { SerieServiceService } from 'src/app/services/serie-service.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent {
  numbers = Array(20).fill(4); // [4,4,4,4,4]
  movie_serie = "";

  selectedRadio: string = "movies";
  searchString: string = '';
  isLoading = false;
  movies_series!: any;

  constructor(private movieService: MovieServiceService, private serieService: SerieServiceService) {

  }

  searchMoviesSeries(){
    this.isLoading = true;
    if(this.selectedRadio === "movies"){
      this.movieService.getMovieSearchList(this.searchString, 1).subscribe(
        movies => {
          this.movies_series = movies;
          this.isLoading = false;
        }
      )
    }else if(this.selectedRadio === "series"){
      this.serieService.getSerieSearchList(this.searchString, 1).subscribe(
        series => {
          this.movies_series = series;
        }
      )
    }
  }
}
