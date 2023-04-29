import { Component } from '@angular/core';
import { MovieServiceService } from 'src/app/services/movie-service.service';
import { SerieServiceService } from 'src/app/services/serie-service.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent {

  selectedRadio: string = "movies";
  searchString: string = '';
  isLoading = false;
  movies_series!: any;
  user!: any;

  constructor(private movieService: MovieServiceService, private serieService: SerieServiceService) {

  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }
  }

  searchMoviesSeries(){
    this.isLoading = true;
    if(this.selectedRadio === "movies"){
      this.movieService.getMovieSearchList(this.searchString, 1, this.user.language, this.user.userId).subscribe(
        movies => {
          this.movies_series = movies;
          this.isLoading = false;
        }
      )
    }else if(this.selectedRadio === "series"){
      this.serieService.getSerieSearchList(this.searchString, 1, this.user.language, this.user.userId).subscribe(
        series => {
          this.movies_series = series;
          this.isLoading = false;
        }
      )
    }
  }
}
