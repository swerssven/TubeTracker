import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
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
  private subscriptions: Subscription = new Subscription();

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

    this.subscriptions.add(this.movieService.getMoviePopularList(this.user.language, this.user.userId).subscribe(
      (data) => {this.movies_popular = data;}
    ))

    this.subscriptions.add(this.movieService.getMovieTopRatedList(this.user.language, this.user.userId).subscribe(
      (data) => {this.movies_topRated = data;}
    ))

    this.subscriptions.add(this.serieService.getSeriePopularList(this.user.language, this.user.userId).subscribe(
      (data) => {this.series_popular = data;}
    ))

    this.subscriptions.add(this.serieService.getSerieTopRatedList(this.user.language, this.user.userId).subscribe(
      (data) => {this.series_topRated = data;}
    ))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
