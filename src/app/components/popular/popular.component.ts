import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MovieServiceService } from 'src/app/services/movie-service.service';
import { SerieServiceService } from 'src/app/services/serie-service.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent {
  movies_recommended!: any;
  series_recommended!: any;
  movies_popular!: any;
  series_popular!: any;
  movies_topRated!: any;
  series_topRated!: any;
  user!: any;

  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: false,
    margin: 20,
    navSpeed: 700,
    navText: ['<<<', '>>>'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    }
  }

  constructor(private movieService: MovieServiceService, private serieService: SerieServiceService, public tranlate: TranslateService){}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }

    this.movieService.getMoviePopularList(1, this.user.language).subscribe(
      (data) => {this.movies_popular = data;}
    )

    this.movieService.getMovieTopRatedList(1, this.user.language).subscribe(
      (data) => {this.movies_topRated = data;}
    )

    this.serieService.getSeriePopularList(1, this.user.language).subscribe(
      (data) => {this.series_popular = data;}
    )

    this.serieService.getSerieTopRatedList(1, this.user.language).subscribe(
      (data) => {this.series_topRated = data;}
    )
  }
}
