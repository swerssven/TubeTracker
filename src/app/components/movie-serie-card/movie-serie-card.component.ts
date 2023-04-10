import { Component, Input } from '@angular/core';
import { IMovieSerieCard } from 'src/app/interfaces/i-movie-serie-card';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-serie-card.component.html',
  styleUrls: ['./movie-serie-card.component.scss']
})
export class MovieSerieCardComponent {
  @Input() movie_serie!: any;
  date!: Date;

  ngOnInit(): void {
    this.date = new Date(this.movie_serie.release_date);
  }
}
