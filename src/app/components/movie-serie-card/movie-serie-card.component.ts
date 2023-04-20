import { Component, Input } from '@angular/core';
import { IMovieSerieCard } from 'src/app/interfaces/i-movie-serie-card';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-serie-card.component.html',
  styleUrls: ['./movie-serie-card.component.scss']
})
export class MovieSerieCardComponent {
  @Input() movie_serie!: any;
  @Input() type!: string;
  date!: Date;

  ngOnInit(): void {
    if(this.type == "movies"){
      this.date = new Date(this.movie_serie.release_date);
    }else if(this.type == "series"){
      this.date = new Date(this.movie_serie.first_air_date);
    }
  }
}
